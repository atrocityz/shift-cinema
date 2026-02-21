import { useMemo, useState } from 'react'

import { formatDateToView, translateHall } from '@/utils/helpers'

import type { Place } from '../../../../../../-contexts/order'

import { useOrder } from '../../../../../../-contexts/order'
import { useChoosePlaceStepContext } from '../../../contexts/choosePlaceStep'
import { groupPlacesByRow } from '../../../helpers'

export const useChoosePlaceStepMobileView = () => {
  const orderContext = useOrder()
  const choosePlaceStepContext = useChoosePlaceStepContext()

  const [showMobileDetails, setShowMobileDetails] = useState(false)
  const [emptyTickets, setEmptyTickets] = useState<Place[]>([])

  const groupedPlacesByRow = useMemo(
    () => groupPlacesByRow(orderContext.selectedPlaces),
    [orderContext.selectedPlaces],
  )
  const formattedDateAndTime = `${formatDateToView(orderContext.date, 'longDayMonth')} ${orderContext.seance.time}`
  const hallName = translateHall(orderContext.seance.hall.name)
  const isPlacesEmpty = !orderContext.selectedPlaces.some(
    (place) => place.row > 0 && place.place > 0,
  )
  const totalPrice = orderContext.getTotalPrice()

  const onSelectChange = (id: string, place: Place) => {
    const isEmptyTicket = id.startsWith('empty-')

    if (isEmptyTicket) {
      orderContext.setSelectedPlaces([...orderContext.selectedPlaces, place])
      setEmptyTickets((prev) => prev.filter((ticket) => ticket.id !== id))
      return
    }

    const index = orderContext.selectedPlaces.findIndex(
      (place) => place.id === id,
    )

    if (index !== -1) {
      const newSelectedPlaces = [...orderContext.selectedPlaces]
      newSelectedPlaces[index] = place
      orderContext.setSelectedPlaces(newSelectedPlaces)
    }
  }

  const removeTicket = (id: string) => {
    const isEmptyTicket = id.startsWith('empty-')

    if (isEmptyTicket) {
      setEmptyTickets((prev) => prev.filter((ticket) => ticket.id !== id))
    } else {
      orderContext.setSelectedPlaces(
        orderContext.selectedPlaces.filter((place) => place.id !== id),
      )
    }
  }

  const addTicket = () => {
    const newTicket = {
      id: `empty-${Date.now()}`,
      row: 0,
      place: 0,
      price: 0,
    } satisfies Place

    setEmptyTickets((prev) => [...prev, newTicket])
  }

  const onContinueClick = () => setShowMobileDetails(true)
  const onBuyButtonClick = () => orderContext.setStep('profile-data')

  const goBack = () => {
    if (showMobileDetails) {
      setShowMobileDetails(false)
    } else {
      choosePlaceStepContext.onBackButtonClick()
    }
  }

  const displayedPlaces = useMemo(
    () =>
      !orderContext.selectedPlaces.length && !emptyTickets.length
        ? [
            {
              id: `empty-default`,
              row: 0,
              place: 0,
              price: 0,
            } satisfies Place,
          ]
        : [...orderContext.selectedPlaces, ...emptyTickets],
    [emptyTickets, orderContext.selectedPlaces],
  )

  return {
    contexts: {
      orderContext,
      choosePlaceStepContext,
    },
    state: {
      formattedDateAndTime,
      groupedPlacesByRow,
      displayedPlaces,
      hallName,
      hasEmptyTickets: !!emptyTickets.length,
      isPlacesEmpty,
      showMobileDetails,
      totalPrice,
    },
    functions: {
      addTicket,
      goBack,
      onBuyButtonClick,
      onContinueClick,
      onSelectChange,
      removeTicket,
    },
  }
}
