import { createFileRoute } from '@tanstack/react-router'
import { Loader } from 'lucide-react'

import { Button } from '@/components/ui'

import { FilmCard } from './-components/FilmCard.tsx'
import { FilmSchedules } from './-components/FilmSchedule.tsx'
import { MoviePageNavigation } from './-components/MoviePageNavigation.tsx'
import { useMoviePage } from './-hooks/useMoviePage.ts'

const FilmPage = () => {
  const { state } = useMoviePage()

  return (
    <div className="flex flex-col items-start gap-6 pb-6">
      <MoviePageNavigation />
      {state.loading && (
        <Loader className="text-primary col-span-full mx-auto size-12 flex-1 animate-spin" />
      )}
      {!state.loading && !state.film && (
        <p className="text-center text-2xl">Фильм не найден</p>
      )}
      {!state.loading && state.film && (
        <FilmCard className="md:mb-6" film={state.film} />
      )}
      {!state.loading && state.schedules && (
        <div className="grid gap-12">
          <FilmSchedules schedules={state.schedules} />
          <Button className="md:max-w-82">Продолжить</Button>
        </div>
      )}
    </div>
  )
}

export const Route = createFileRoute('/films/$filmId')({
  component: FilmPage,
})
