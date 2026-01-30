import { useRouter } from '@tanstack/react-router'
import { useMemo } from 'react'

import { formatDateToView, translateHall } from '@/utils/helpers'

import { useOrder } from '../../../../-contexts'
import { groupPlacesByRow } from '../helpers'

export const useChoosePlaceStep = () => {
  const orderContext = useOrder()
  const router = useRouter()

  const onBackButtonClick = () => router.history.back()
  const onBuyButtonClick = () => orderContext.setStep('profile-data')

  const groupedPlaces = useMemo(
    () => groupPlacesByRow(orderContext.selectedPlaces),
    [orderContext.selectedPlaces],
  )
  const formattedDateAndTime = `${formatDateToView(orderContext.date, 'longDayMonth')} ${orderContext.seance.time}`

  return {
    contexts: {
      orderContext,
    },
    state: {
      groupedPlacesByRow: groupedPlaces,
      isPlacesEmpty: orderContext.selectedPlaces.length === 0,
      totalPrice: orderContext.getTotalPrice(),
      formattedDateAndTime,
      hallName: translateHall(orderContext.seance.hall.name),
    },
    functions: {
      onBackButtonClick,
      onBuyButtonClick,
    },
  }
}
