import { useMemo } from 'react'

import { formatDateToView, translateHall } from '@/utils/helpers'

import { useOrder } from '../../../../../../-contexts/order'
import { useChoosePlaceStepContext } from '../../../contexts/choosePlaceStep'
import { groupPlacesByRow } from '../../../helpers'

export const useChoosePlaceStepDesktopView = () => {
  const orderContext = useOrder()
  const choosePlaceStepContext = useChoosePlaceStepContext()

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
  const onBuyButtonClick = () => orderContext.setStep('profile-data')

  return {
    contexts: {
      orderContext,
      choosePlaceStepContext,
    },
    state: {
      formattedDateAndTime,
      groupedPlacesByRow,
      hallName,
      isPlacesEmpty,
      totalPrice,
    },
    functions: {
      onBuyButtonClick,
    },
  }
}
