import { useRouter } from '@tanstack/react-router'
import { useMemo } from 'react'

import { useOrder } from '@/routes/order/_layout/-contexts/order'
import { formatDateToView, translateHall } from '@/utils/helpers'

import { groupPlacesByRow } from '../../../helpers'

export const useChoosePlaceStepDesktopView = () => {
  const orderContext = useOrder()
  const router = useRouter()

  const groupedPlacesByRow = useMemo(
    () => groupPlacesByRow(orderContext.selectedPlaces),
    [orderContext.selectedPlaces],
  )
  const formattedDateAndTime = `${formatDateToView(orderContext.date, 'longDayMonth')} ${orderContext.seance.time}`
  const hallName = translateHall(orderContext.seance.hall.name)
  const isPlacesEmpty = !orderContext.selectedPlaces.some(
    (place) => place.row > 0 && place.place > 0,
  )
  const onBuyButtonClick = () => orderContext.setStep('profile-data')
  const onBackButtonClick = () => router.history.back()

  return {
    contexts: {
      orderContext,
    },
    state: {
      formattedDateAndTime,
      groupedPlacesByRow,
      hallName,
      isPlacesEmpty,
    },
    functions: {
      onBuyButtonClick,
      onBackButtonClick,
    },
  }
}
