import { queryOptions } from '@tanstack/react-query'

import type { GetApiCinemaFilmByFilmIdRequestParams } from '@/generated/api'

import { getApiCinemaFilmByFilmId } from '@/generated/api'

export const filmQueryByIdOptions = (
  requestConfig: GetApiCinemaFilmByFilmIdRequestParams,
) =>
  queryOptions({
    queryKey: ['getApiCinemaFilmByFilmId', requestConfig.path.filmId],
    queryFn: () => getApiCinemaFilmByFilmId(requestConfig),
  })
