import { createContext } from 'react'

import type { FilmScheduleSeance } from '@/generated/api'

export type Step = 'choose-place' | 'payment' | 'profile-data' | 'success'

export interface Place {
  id: string
  price: number
  row: number
  seat: number
}

interface OrderContextState {
  date: string
  filmId: string
  seance: FilmScheduleSeance
  selectedPlaces: Place[]
  step: Step

  getTotalPrice: () => number
  setSelectedPlaces: (places: Place[]) => void
  setStep: (step: Step) => void
  togglePlace: (place: Place) => void
}

const initialState: OrderContextState = {
  date: '',
  filmId: '',
  seance: {} as FilmScheduleSeance,
  selectedPlaces: [],
  step: 'choose-place',

  getTotalPrice: () => 0,
  setSelectedPlaces: () => {},
  setStep: () => {},
  togglePlace: () => {},
}

export const OrderContext = createContext<OrderContextState>(initialState)
