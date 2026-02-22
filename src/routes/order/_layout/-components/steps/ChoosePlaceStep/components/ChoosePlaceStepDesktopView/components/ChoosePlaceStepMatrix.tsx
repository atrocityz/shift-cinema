import type { Seat } from '@/generated/api'
import type { Place } from '@/routes/order/_layout/-contexts/order'

import { ChoosePlaceStepMatrixPlace } from './ChoosePlaceStepMatrixPlace'

interface ChoosePlaceStepMatrixProps {
  places: Seat[][]
  selectedPlaces: Place[]
  togglePlace: (place: Place) => void
}

export const ChoosePlaceStepMatrix = ({
  places,
  togglePlace,
  selectedPlaces,
}: ChoosePlaceStepMatrixProps) => (
  <div className="grid max-w-fit gap-6">
    <div className="flex flex-col items-center gap-2">
      <span className="text-sm">Экран</span>
      <div className="h-4 w-full rounded-xl bg-gray-400" />
    </div>
    <span className="text-sm">Ряд</span>
    {places.map((row, rowIndex) => {
      const rowNumber = rowIndex + 1

      return (
        <div
          key={`row-${rowNumber}`}
          style={{
            gridTemplateColumns: `auto repeat(${row.length}, minmax(0, 1fr))`,
          }}
          className="flex items-center gap-4"
        >
          <div className="min-w-5 text-sm text-gray-600 dark:text-gray-400">
            {rowNumber}
            <span className="sr-only">ряд</span>
          </div>
          {row.map((place, placeIndex) => {
            const placeNumber = placeIndex + 1
            const id = `${rowNumber}-${placeNumber}`

            return (
              <ChoosePlaceStepMatrixPlace
                key={id}
                disabled={place.type === 'BLOCKED'}
                id={id}
                isSelected={!!selectedPlaces.find((place) => place.id === id)}
                placeNumber={placeNumber}
                price={place.price}
                title={`Ряд ${rowNumber}, Место ${placeNumber} - ${place.price}₽ (${place.type})`}
                onSelectPlace={togglePlace}
                row={rowNumber}
              >
                {placeNumber}
              </ChoosePlaceStepMatrixPlace>
            )
          })}
        </div>
      )
    })}
  </div>
)
