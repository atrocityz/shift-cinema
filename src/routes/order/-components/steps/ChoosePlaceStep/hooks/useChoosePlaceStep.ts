import { useRouter } from '@tanstack/react-router'
import { useEffect, useMemo } from 'react'

import { formatDateToView, translateHall } from '@/utils/helpers'
import { useOrderStore } from '@/utils/stores'

import { groupPlacesByRow } from '../helpers'

export const useChoosePlaceStep = () => {
  const orderStore = useOrderStore()
  const router = useRouter()

  const onBackButtonClick = () => router.history.back()
  const onBuyButtonClick = () => orderStore.setStep('profile-data')

  const groupedPlaces = useMemo(
    () => groupPlacesByRow(orderStore.places),
    [orderStore.places],
  )
  const formattedDateAndTime = `${formatDateToView(orderStore.date!, 'longDayMonth')} ${orderStore.seance!.time}`

  useEffect(() => {
    orderStore.setPlaces([])
  }, [])

  return {
    stores: {
      orderStore,
    },
    state: {
      groupedPlacesByRow: groupedPlaces,
      isPlacesEmpty: orderStore.places.length === 0,
      totalPrice: orderStore.getTotalPrice(),
      formattedDateAndTime,
      hallName: translateHall(orderStore.seance!.hall.name),
    },
    functions: {
      onBackButtonClick,
      onBuyButtonClick,
    },
  }
}
