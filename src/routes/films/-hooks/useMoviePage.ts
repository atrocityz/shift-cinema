import { getRouteApi } from '@tanstack/react-router'
import { useEffect } from 'react'

import type { FilmSchedule, FilmScheduleSeance } from '@/generated/api'

import { useOrderStore } from '@/utils/stores'

const routeApi = getRouteApi('/films/_layout/$filmId')

export const useMoviePage = () => {
  const { '0': filmResponse, '1': sheduleResponse } = routeApi.useLoaderData()
  const orderStore = useOrderStore()

  const formattedFilm = {
    ...filmResponse.data.film,
    img: `${import.meta.env.VITE_BASE_API_URL}/api/${filmResponse.data.film.img}`,
  }

  const onTimeSelect = (
    date: FilmSchedule['date'] | null,
    seance: FilmScheduleSeance | null,
  ) => {
    orderStore.setDate(date)
    orderStore.setSeance(seance)
    orderStore.setFilm(formattedFilm || null)
    orderStore.setStep('choose-place')
  }

  useEffect(() => {
    if (
      formattedFilm &&
      orderStore.film &&
      formattedFilm.id !== orderStore.film.id
    ) {
      orderStore.clear()
    }
  }, [formattedFilm, orderStore.film])

  return {
    stores: {
      orderStore,
    },
    state: {
      film: formattedFilm,
      schedules: sheduleResponse.data.schedules,
    },
    functions: {
      onTimeSelect,
    },
  }
}
