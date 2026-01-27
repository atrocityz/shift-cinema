import { useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/utils/constants/queryKeys'

import { getFilms } from '../requests/cinema/films'

export const useGetFilmsQuery = (settings?: QuerySettings<typeof getFilms>) =>
  useQuery({
    queryKey: [QUERY_KEYS.FILMS],
    queryFn: () => getFilms(settings?.config),
    staleTime: Infinity,
    ...settings?.options,
  })
