import { useGetApiCinemaFilmsQuery } from '@/generated/api'

export const useMainPage = () => {
  const filmsQuery = useGetApiCinemaFilmsQuery()

  return {
    state: {
      films: filmsQuery.data?.data.films || [],
      loading: filmsQuery.isLoading,
    },
  }
}
