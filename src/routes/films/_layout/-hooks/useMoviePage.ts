import { getRouteApi } from '@tanstack/react-router'
import { useState } from 'react'

import type { FilmSchedule, FilmScheduleSeance } from '@/generated/api'

const routeApi = getRouteApi('/films/_layout/$filmId')

export const useMoviePage = () => {
  const { '0': filmResponse, '1': sheduleResponse } = routeApi.useLoaderData()
  const [selectedDate, setSelectedDate] = useState<FilmSchedule['date'] | null>(
    null,
  )
  const [selectedSeance, setSelectedSeance] =
    useState<FilmScheduleSeance | null>(null)

  const formattedFilm = {
    ...filmResponse.data.film,
    img: `${import.meta.env.VITE_BASE_API_URL}/api/${filmResponse.data.film.img}`,
  }

  const onTimeSelect = (
    date: FilmSchedule['date'],
    seance: FilmScheduleSeance,
  ) => {
    setSelectedDate(date)
    setSelectedSeance(seance)
  }

  return {
    state: {
      film: formattedFilm,
      schedules: sheduleResponse.data.schedules,
      selectedDate,
      selectedSeance,
    },
    functions: {
      onTimeSelect,
    },
  }
}
