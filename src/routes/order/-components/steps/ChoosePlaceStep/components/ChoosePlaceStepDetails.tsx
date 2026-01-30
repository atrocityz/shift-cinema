import type { Place } from '@/routes/order/-contexts'

interface ChoosePlaceStepDetailsProps {
  dateAndTime: string
  hallName: string
  isPlacesEmpty: boolean
  places: Record<number, Place[]>
  totalPrice: number
}

export const ChoosePlaceStepDetails = ({
  hallName,
  dateAndTime,
  places,
  totalPrice,
  isPlacesEmpty,
}: ChoosePlaceStepDetailsProps) => (
  <div className="grid gap-6">
    <div className="grid gap-0.5">
      <h3 className="text-sm text-gray-600 dark:text-gray-400">Зал</h3>
      <p>{hallName}</p>
    </div>
    <div>
      <h3 className="text-sm text-gray-600 dark:text-gray-400">Дата и время</h3>
      <p>{dateAndTime}</p>
    </div>
    <div>
      <h3 className="text-sm text-gray-600 dark:text-gray-400">Места</h3>
      {isPlacesEmpty && <p>Не выбраны</p>}
      {Object.entries(places).map(([row, places]) => (
        <div key={`row-${row}`}>
          {row} ряд - {places.map((place) => place.seat).join(', ')}
        </div>
      ))}
    </div>
    <div className="text-xl font-semibold">Сумма: {totalPrice}₽</div>
  </div>
)
