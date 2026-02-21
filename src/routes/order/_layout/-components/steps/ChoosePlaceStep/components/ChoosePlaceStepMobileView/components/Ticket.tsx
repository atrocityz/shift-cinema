import type { ComponentProps } from 'react'

import { Trash } from 'lucide-react'

import type { Seat } from '@/generated/api'
import type { Place } from '@/routes/order/_layout/-contexts/order'

import {
  Button,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'

interface TicketProps extends ComponentProps<'div'> {
  allSelectedPlaces: Place[]
  number: number
  seats: Seat[][]
  ticket: Place
  onRemove?: (id: string) => void
  onSelectChange: (id: string, place: Place) => void
}

export const Ticket = ({
  allSelectedPlaces,
  number,
  seats,
  ticket,
  onRemove,
  onSelectChange,
  ...props
}: TicketProps) => {
  const onRowChange = (newRow: string) => {
    const rowIndex = Number(newRow) - 1
    const rowSeats = seats[rowIndex]

    const firstAvailableSeatIndex = rowSeats.findIndex((seat, index) => {
      if (seat.type === 'BLOCKED') return false

      const placeId = `${newRow}-${index + 1}`
      const isSelectedInOtherTicket = allSelectedPlaces.some(
        (place) =>
          place.id === placeId &&
          place.id !== ticket.id &&
          place.row > 0 &&
          place.place > 0,
      )

      return !isSelectedInOtherTicket
    })

    if (firstAvailableSeatIndex !== -1) {
      const newPlace = firstAvailableSeatIndex + 1
      const newPrice = rowSeats[firstAvailableSeatIndex].price

      onSelectChange(ticket.id, {
        id: `${newRow}-${newPlace}`,
        row: Number(newRow),
        place: newPlace,
        price: newPrice,
      })
    } else {
      onSelectChange(ticket.id, {
        id: `${newRow}-0`,
        row: Number(newRow),
        place: 0,
        price: 0,
      })
    }
  }

  const onPlaceChange = (newPlace: string) => {
    const placeIndex = Number(newPlace) - 1
    const newPrice = seats[ticket.row - 1][placeIndex].price

    onSelectChange(ticket.id, {
      ...ticket,
      id: `${ticket.row}-${newPlace}`,
      place: Number(newPlace),
      price: newPrice,
    })
  }

  const isPlaceDisabled = (row: number, placeIndex: number) => {
    const seat = seats[row - 1][placeIndex]
    if (seat.type === 'BLOCKED') return true

    const placeId = `${row}-${placeIndex + 1}`

    return allSelectedPlaces.some(
      (place) =>
        place.id === placeId &&
        place.id !== ticket.id &&
        place.row > 0 &&
        place.place > 0,
    )
  }

  const hasAvailablePlaces = (row: number) => {
    if (row === 0) return false
    return seats[row - 1].some((_, index) => !isPlaceDisabled(row, index))
  }

  const isRowSelected = ticket.row > 0
  const isPlaceSelected = ticket.place > 0
  const hasPlacesInSelectedRow = isRowSelected && hasAvailablePlaces(ticket.row)

  return (
    <div className="grid gap-4" {...props}>
      <div className="flex items-center justify-between">
        <h3>Билет {number}</h3>
        {onRemove && (
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onRemove(ticket.id)}
          >
            <Trash className="size-4" />
          </Button>
        )}
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="grid gap-1.5">
          <h4 className="text-sm">Ряд</h4>
          <Select
            value={isRowSelected ? String(ticket.row) : undefined}
            onValueChange={onRowChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Выберите" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {seats.map((_, index) => {
                  const rowNumber = index + 1
                  return (
                    <SelectItem
                      key={`row-${rowNumber}`}
                      value={String(rowNumber)}
                    >
                      {rowNumber}
                    </SelectItem>
                  )
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-1.5">
          <h4 className="text-sm">Место</h4>
          <Select
            disabled={!isRowSelected || !hasPlacesInSelectedRow}
            value={isPlaceSelected ? String(ticket.place) : undefined}
            onValueChange={onPlaceChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={
                  isRowSelected && !hasPlacesInSelectedRow
                    ? 'Нет мест'
                    : 'Выберите'
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {isRowSelected &&
                  seats[ticket.row - 1].map((_, index) => {
                    const placeNumber = index + 1
                    return (
                      <SelectItem
                        key={`seat-${ticket.row}-${placeNumber}`}
                        disabled={isPlaceDisabled(ticket.row, index)}
                        value={String(placeNumber)}
                      >
                        {placeNumber}
                      </SelectItem>
                    )
                  })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
