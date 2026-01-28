import { createFileRoute } from '@tanstack/react-router'
import { Loader } from 'lucide-react'

import { FilmCardListItem } from './-components/FilmCardListItem'
import { useMainPage } from './-hooks/useMainPage'

const MainPage = () => {
  const { state } = useMainPage()

  return (
    <div className="flex flex-col gap-4 py-3 md:py-12">
      <h1 className="py-3 text-2xl font-bold md:py-0">Афиша</h1>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(296px,1fr))] gap-14 md:gap-8">
        {state.loading && (
          <Loader className="text-primary col-span-full mx-auto size-12 flex-1 animate-spin" />
        )}
        {!state.loading && state.films.length === 0 && (
          <p className="col-span-full text-center">Фильмы не найдены</p>
        )}
        {!state.loading &&
          state.films.map((film) => (
            <FilmCardListItem key={film.id} film={film} />
          ))}
      </ul>
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: MainPage,
})
