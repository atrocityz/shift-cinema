import { queryOptions } from '@tanstack/react-query'

import type { GetApiCinemaFilmsRequestParams } from '@/generated/api'

import { getApiCinemaFilms } from '@/generated/api'

export const filmsQueryOptions = (
  requestConfig?: GetApiCinemaFilmsRequestParams,
) =>
  queryOptions({
    queryKey: ['getApiCinemaFilms'],
    queryFn: () => getApiCinemaFilms(requestConfig),
  })
