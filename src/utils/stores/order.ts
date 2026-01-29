import { create } from 'zustand'

import type { Film, FilmSchedule, FilmScheduleSeance } from '@/generated/api'

export type Step = 'choose-place' | 'payment' | 'profile-data' | 'success'

export interface Place {
  id: string
  price: number
  row: number
  seat: number
}

interface OrderState {
  date: FilmSchedule['date'] | null
  film: Film | null
  places: Place[]
  seance: FilmScheduleSeance | null
  step: Step
}

interface OrderActions {
  clear: () => void
  getTotalPrice: () => number
  setDate: (date: FilmSchedule['date'] | null) => void
  setFilm: (film: Film | null) => void
  setPlaces: (places: Place[]) => void
  setSeance: (seance: FilmScheduleSeance | null) => void
  setStep: (step: Step) => void
  togglePlace: (place: Place) => void
}

export type OrderStore = OrderState & OrderActions

export const useOrderStore = create<OrderStore>((set, get) => ({
  film: null,
  date: null,
  seance: null,
  places: [],
  step: 'choose-place',

  getTotalPrice: () =>
    get().places.reduce((acc, place) => acc + place.price, 0),
  setFilm: (film) => set({ film }),
  setDate: (date) => set({ date }),
  setSeance: (seance) => set({ seance }),
  setStep: (step) => set({ step }),
  setPlaces: (places) => set({ places }),
  togglePlace: (place) =>
    set((state) => {
      const isAlreadyAdded = state.places.find((p) => p.id === place.id)

      if (isAlreadyAdded) {
        return {
          places: state.places.filter((p) => p.id !== place.id),
        }
      }

      return {
        places: [...state.places, place],
      }
    }),
  clear: () =>
    set({
      film: null,
      date: null,
      seance: null,
      step: 'choose-place',
      places: [],
    }),
}))
