import { Button } from '@/components/ui'

import { StepInfo } from '../../../../StepInfo'
import { ChoosePlaceStepDetails } from '../ChoosePlaceStepDetails'
import { Ticket } from './components/Ticket'
import { useChoosePlaceStepMobileView } from './hooks'

export const ChoosePlaceStepMobileView = () => {
  const { contexts, state, functions } = useChoosePlaceStepMobileView()

  return (
    <div className="flex flex-1 flex-col gap-6 md:hidden">
      <StepInfo
        step={1}
        title="Выбор места"
        onBackClick={functions.onBackButtonClick}
      />
      {!state.showMobileDetails ? (
        <>
          <div className="grid gap-10">
            {state.tickets.map((ticket, index) => (
              <Ticket
                key={ticket.id}
                allSelectedPlaces={contexts.orderContext.selectedPlaces}
                number={index + 1}
                seats={contexts.orderContext.seance.hall.places}
                ticket={ticket}
                onRemove={
                  state.tickets.length > 1 ? functions.removeTicket : undefined
                }
                onSelectChange={functions.onSelectChange}
              />
            ))}
          </div>
          <Button
            className="w-full"
            variant="outline"
            onClick={functions.addTicket}
          >
            Еще билет
          </Button>
          <Button
            className="mt-auto"
            disabled={state.hasEmptyTickets}
            onClick={functions.onContinueClick}
          >
            Продолжить
          </Button>
        </>
      ) : (
        <>
          <ChoosePlaceStepDetails
            dateAndTime={state.formattedDateAndTime}
            filmName={contexts.orderContext.film.name}
            hallName={state.hallName}
            places={state.groupedPlacesByRow}
            totalPrice={contexts.orderContext.getTotalPrice()}
          />
          <Button className="mt-auto" onClick={functions.onBuyButtonClick}>
            Купить
          </Button>
        </>
      )}
    </div>
  )
}
