import { queryOptions } from '@tanstack/react-query'

import type { GetApiCinemaFilmByFilmIdScheduleRequestParams } from '@/generated/api'

import { getApiCinemaFilmByFilmIdSchedule } from '@/generated/api'

export const filmScheduleOptions = (
  requestConfig: GetApiCinemaFilmByFilmIdScheduleRequestParams,
) =>
  queryOptions({
    queryKey: ['getApiCinemaFilmByFilmIdSchedule', requestConfig.path.filmId],
    queryFn: () => getApiCinemaFilmByFilmIdSchedule(requestConfig),
  })
