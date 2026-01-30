import type { ReactNode } from 'react'

import { useMemo, useState } from 'react'

import type { FilmScheduleSeance } from '@/generated/api'

import type { Place, Step } from './OrderContext'

import { OrderContext } from './OrderContext'

interface OrderProviderProps {
  children: ReactNode
  date: string
  filmId: string
  seance: FilmScheduleSeance
}

export const OrderProvider = ({
  filmId,
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
      filmId,
      date,
      seance,
      selectedPlaces,
      step,
      setStep,
      setSelectedPlaces,
      togglePlace,
      getTotalPrice,
    }),
    [filmId, date, seance, selectedPlaces, step],
  )

  return <OrderContext value={value}>{children}</OrderContext>
}
