import { useGetFilmsQuery } from '@/utils/api/hooks'

export const useMainPage = () => {
  const filmsQuery = useGetFilmsQuery()

  return {
    state: {
      films: filmsQuery.data?.data.films || [],
      loading: filmsQuery.isLoading,
    },
  }
}
