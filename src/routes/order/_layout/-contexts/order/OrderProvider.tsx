import type { ReactNode } from 'react'

import { useMemo, useState } from 'react'

import type { Film, FilmScheduleSeance } from '@/generated/api'

import type { Place, Step } from './OrderContext.ts'

import { OrderContext } from './OrderContext.ts'

interface OrderProviderProps {
  children: ReactNode
  date: string
  film: Film
  seance: FilmScheduleSeance
}

export const OrderProvider = ({
  film,
  date,
  seance,
  children,
}: OrderProviderProps) => {
  const [selectedPlaces, setSelectedPlaces] = useState<Place[]>([])
  const [step, setStep] = useState<Step>('choose-place')

  const togglePlace = (place: Place) => {
    setSelectedPlaces((prev) => {
      const isAlreadyAdded = prev.find((p) => p.id === place.id)

      if (isAlreadyAdded) {
        return prev.filter((p) => p.id !== place.id)
      }

      return [...prev, place]
    })
  }

  const getTotalPrice = () =>
    selectedPlaces.reduce((acc, place) => acc + place.price, 0)

  const value = useMemo(
    () => ({
      film,
      date,
      seance,
      selectedPlaces,
      step,
      setStep,
      setSelectedPlaces,
      togglePlace,
      getTotalPrice,
    }),
    [film, date, seance, selectedPlaces, step],
  )

  return <OrderContext value={value}>{children}</OrderContext>
}
