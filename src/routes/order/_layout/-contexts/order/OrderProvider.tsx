import type { ReactNode } from 'react'

import { useCallback, useMemo, useState } from 'react'

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

  const togglePlace = useCallback((place: Place) => {
    setSelectedPlaces((current) => {
      const isAlreadyAdded = current.find((p) => p.id === place.id)

      if (isAlreadyAdded) {
        return current.filter((p) => p.id !== place.id)
      }

      return [...current, place]
    })
  }, [])

  const totalPrice = selectedPlaces.reduce((acc, place) => acc + place.price, 0)

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
      totalPrice,
    }),
    [film, date, seance, selectedPlaces, step],
  )

  return <OrderContext value={value}>{children}</OrderContext>
}
