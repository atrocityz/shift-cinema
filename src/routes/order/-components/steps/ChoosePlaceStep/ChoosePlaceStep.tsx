import { Button } from '@/components/ui'

import { StepInfo } from '../../StepInfo'
import { ChoosePlaceStepDetails } from './components/ChoosePlaceStepDetails'
import { ChoosePlaceStepMatrix } from './components/ChoosePlaceStepMatrix'
import { useChoosePlaceStep } from './hooks'

export const ChoosePlaceStep = () => {
  const { state, stores, functions } = useChoosePlaceStep()

  return (
    <>
      <StepInfo
        step={1}
        title="Выбор места"
        onBackClick={functions.onBackButtonClick}
      />
      <ChoosePlaceStepMatrix
        hall={stores.orderStore.seance!.hall}
        places={stores.orderStore.places}
        togglePlace={stores.orderStore.togglePlace}
      />
      <ChoosePlaceStepDetails
        dateAndTime={state.formattedDateAndTime}
        hallName={state.hallName}
        isPlacesEmpty={state.isPlacesEmpty}
        places={state.groupedPlacesByRow}
        totalPrice={state.totalPrice}
      />
      <div className="flex items-center gap-6 py-4">
        <Button
          className="hidden md:inline-flex"
          variant="outline"
          onClick={functions.onBackButtonClick}
        >
          Назад
        </Button>
        <Button
          className="w-full md:max-w-43"
          disabled={state.isPlacesEmpty}
          onClick={functions.onBuyButtonClick}
        >
          Купить
        </Button>
      </div>
    </>
  )
}
