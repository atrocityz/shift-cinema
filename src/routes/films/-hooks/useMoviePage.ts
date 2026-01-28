import { useParams } from '@tanstack/react-router'

import {
  useGetApiCinemaFilmByFilmIdQuery,
  useGetApiCinemaFilmByFilmIdScheduleQuery,
} from '@/generated/api'

export const useMoviePage = () => {
  const { filmId } = useParams({ from: '/films/$filmId' })
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

  return {
    state: {
      film: formattedFilm,
      schedules: filmScheduleQuery.data?.data.schedules,
      loading: filmQuery.isLoading || filmScheduleQuery.isLoading,
    },
  }
}
