import type { Place } from '@/routes/order/_layout/-contexts'

export const groupPlacesByRow = (places: Place[]) =>
  places.reduce(
    (acc, place) => {
      if (!acc[place.row]) {
        acc[place.row] = []
      }
      acc[place.row].push(place)
      return acc
    },
    {} as Record<number, Place[]>,
  )
