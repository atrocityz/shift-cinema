import type { FilmHall } from '@/generated/api'
import type { Place } from '@/routes/order/-contexts'

import { cn } from '@/utils/lib'

interface ChoosePlaceStepMatrixProps {
  hall: FilmHall
  places: Place[]
  togglePlace: (place: Place) => void
}

export const ChoosePlaceStepMatrix = ({
  hall,
  togglePlace,
  places,
}: ChoosePlaceStepMatrixProps) => (
  <div className="grid max-w-fit gap-6">
    <div className="flex flex-col items-center gap-2">
      <span className="text-sm">Экран</span>
      <div className="h-4 w-full rounded-xl bg-gray-400" />
    </div>
    <span className="text-sm">Ряд</span>
    {hall.places.map((row, rowIndex) => (
      <div
        key={`row-${rowIndex}`}
        style={{
          gridTemplateColumns: `auto repeat(${row.length}, minmax(0, 1fr))`,
        }}
        className="flex items-center gap-4"
      >
        <div className="min-w-5 text-sm text-gray-600 dark:text-gray-400">
          {rowIndex + 1}
          <span className="sr-only">ряд</span>
        </div>
        {row.map((seat, seatIndex) => {
          const id = `${rowIndex}-${seatIndex}`
          const isPlaceSelected = !!places.find((place) => place.id === id)

          return (
            <button
              key={id}
              className={cn(
                'bg-primary inline-flex h-4 w-4 cursor-pointer items-center justify-center rounded-xs text-[10px] text-transparent transition-all hover:scale-170 hover:text-white disabled:pointer-events-none disabled:bg-gray-400',
                {
                  'bg-primary/30': isPlaceSelected,
                },
              )}
              disabled={seat.type === 'BLOCKED'}
              title={`Ряд ${rowIndex + 1}, Место ${seatIndex + 1} - ${seat.price}₽ (${seat.type})`}
              type="button"
              onClick={() =>
                togglePlace({
                  id,
                  row: rowIndex + 1,
                  price: seat.price,
                  seat: seatIndex + 1,
                })
              }
            >
              {seatIndex + 1}
            </button>
          )
        })}
      </div>
    ))}
  </div>
)
