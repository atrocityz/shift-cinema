import { useParams } from '@tanstack/react-router'
import { useEffect } from 'react'

import type { FilmSchedule, FilmScheduleSeance } from '@/generated/api'

import {
  useGetApiCinemaFilmByFilmIdQuery,
  useGetApiCinemaFilmByFilmIdScheduleQuery,
} from '@/generated/api'
import { useOrderStore } from '@/utils/stores'

export const useMoviePage = () => {
  const { filmId } = useParams({ from: '/films/$filmId' })
  const orderStore = useOrderStore()
  const filmQuery = useGetApiCinemaFilmByFilmIdQuery({
    request: {
      path: {
        filmId,
      },
    },
  })
  const filmScheduleQuery = useGetApiCinemaFilmByFilmIdScheduleQuery({
    request: {
      path: {
        filmId,
      },
    },
  })

  const formattedFilm = filmQuery.data?.data.film && {
    ...filmQuery.data.data.film,
    img: `${import.meta.env.VITE_BASE_API_URL}/api/${filmQuery.data.data.film.img}`,
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
      schedules: filmScheduleQuery.data?.data.schedules,
      loading: filmQuery.isLoading || filmScheduleQuery.isLoading,
    },
    functions: {
      onTimeSelect,
    },
  }
}
