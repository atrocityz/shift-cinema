import { createFileRoute, getRouteApi } from '@tanstack/react-router'

import { CustomLoader } from '@/components/ui'
import { filmsQueryOptions } from '@/utils/api/options'

import { FilmCardListItem } from './-components/FilmCardListItem'

const routeApi = getRouteApi('/(home)/_layout/')

const MainPage = () => {
  const { data } = routeApi.useLoaderData()

  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(296px,1fr))] gap-14 md:gap-8">
      {!data.films.length ? (
        <p className="col-span-full text-center">Фильмы не найдены</p>
      ) : (
        data.films.map((film) => <FilmCardListItem key={film.id} film={film} />)
      )}
    </ul>
  )
}

export const Route = createFileRoute('/(home)/_layout/')({
  component: MainPage,
  loader: ({ context }) => {
    return context.queryClient.ensureQueryData(filmsQueryOptions())
  },
  pendingComponent: CustomLoader,
})
