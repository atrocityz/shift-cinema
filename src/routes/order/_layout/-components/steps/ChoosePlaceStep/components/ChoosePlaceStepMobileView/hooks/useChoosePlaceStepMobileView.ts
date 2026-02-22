import { useRouter } from '@tanstack/react-router'
import { useMemo, useState } from 'react'

import type { Place } from '@/routes/order/_layout/-contexts/order'

import { useOrder } from '@/routes/order/_layout/-contexts/order'
import { formatDateToView, translateHall } from '@/utils/helpers'

import { groupPlacesByRow } from '../../../helpers'

const createEmptyTicket = () =>
  ({
    id: `empty-${crypto.randomUUID()}`,
    row: 0,
    place: 0,
    price: 0,
  }) satisfies Place

const isTicketFullySelected = (ticket: Place) =>
  ticket.row > 0 && ticket.place > 0

export const useChoosePlaceStepMobileView = () => {
  const orderContext = useOrder()
  const router = useRouter()

  const [showMobileDetails, setShowMobileDetails] = useState(false)
  const [emptyTickets, setEmptyTickets] = useState<Place[]>(() => [
    createEmptyTicket(),
  ])

  const tickets = useMemo(
    () =>
      orderContext.selectedPlaces.length
        ? [...orderContext.selectedPlaces, ...emptyTickets]
        : emptyTickets,
    [orderContext.selectedPlaces, emptyTickets],
  )

  const syncTickets = (updatedTickets: Place[]) => {
    const fullySelected = updatedTickets.filter(isTicketFullySelected)
    const empty = updatedTickets.filter((t) => !isTicketFullySelected(t))

    orderContext.setSelectedPlaces(fullySelected)
    setEmptyTickets(
      empty.length ? empty : fullySelected.length ? [] : [createEmptyTicket()],
    )
  }

  const groupedPlacesByRow = useMemo(
    () => groupPlacesByRow(orderContext.selectedPlaces),
    [orderContext.selectedPlaces],
  )
  const formattedDateAndTime = `${formatDateToView(orderContext.date, 'longDayMonth')} ${orderContext.seance.time}`
  const hallName = translateHall(orderContext.seance.hall.name)

  const addTicket = () => {
    setEmptyTickets((prev) => [...prev, createEmptyTicket()])
  }

  const removeTicket = (id: string) => {
    const updatedTickets = tickets.filter((ticket) => ticket.id !== id)
    syncTickets(updatedTickets.length ? updatedTickets : [createEmptyTicket()])
  }

  const onSelectChange = (id: string, ticket: Place) => {
    const isFullySelected = isTicketFullySelected(ticket)

    const updatedTicket = isFullySelected
      ? ticket
      : { ...ticket, id: `empty-${crypto.randomUUID()}` }

    syncTickets(
      tickets.map((ticket) => (ticket.id === id ? updatedTicket : ticket)),
    )
  }

  const onContinueClick = () => setShowMobileDetails(true)
  const onBuyButtonClick = () => orderContext.setStep('profile-data')

  const onBackButtonClick = () => {
    if (showMobileDetails) {
      setShowMobileDetails(false)
    } else {
      router.history.back()
    }
  }

  return {
    contexts: {
      orderContext,
    },
    state: {
      formattedDateAndTime,
      groupedPlacesByRow,
      tickets,
      hallName,
      hasEmptyTickets: tickets.some((ticket) => !isTicketFullySelected(ticket)),
      showMobileDetails,
    },
    functions: {
      addTicket,
      onBackButtonClick,
      onBuyButtonClick,
      onContinueClick,
      onSelectChange,
      removeTicket,
    },
  }
}
