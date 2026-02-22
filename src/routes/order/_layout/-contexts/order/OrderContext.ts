import { createContext } from 'react'

import type {
  CreatePaymentPersonDto,
  Film,
  FilmScheduleSeance,
} from '@/generated/api'

export type Step = 'choose-place' | 'payment' | 'profile-data' | 'success'

export interface Place {
  id: string
  place: number
  price: number
  row: number
}

interface OrderContextState {
  date: string
  film: Film
  person: CreatePaymentPersonDto
  seance: FilmScheduleSeance
  selectedPlaces: Place[]
  step: Step
  totalPrice: number

  setPerson: (person: CreatePaymentPersonDto) => void
  setSelectedPlaces: (places: Place[]) => void
  setStep: (step: Step) => void
  togglePlace: (place: Place) => void
}

const initialState: OrderContextState = {
  date: '',
  film: {} as Film,
  seance: {} as FilmScheduleSeance,
  selectedPlaces: [],
  step: 'choose-place',
  totalPrice: 0,
  person: {} as CreatePaymentPersonDto,

  setSelectedPlaces: () => {},
  setStep: () => {},
  setPerson: () => {},
  togglePlace: () => {},
}

export const OrderContext = createContext<OrderContextState>(initialState)
