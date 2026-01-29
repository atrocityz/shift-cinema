import { createFileRoute, Link } from '@tanstack/react-router'
import { Loader } from 'lucide-react'

import { Button } from '@/components/ui'
import { cn } from '@/utils/lib/cn.ts'

import { FilmCard } from './-components/FilmCard'
import { FilmSchedules } from './-components/FilmSchedule'
import { MoviePageNavigation } from './-components/MoviePageNavigation'
import { useMoviePage } from './-hooks/'

const FilmPage = () => {
  const { state, stores, functions } = useMoviePage()

  return (
    <div className="flex flex-col items-start gap-6 py-4">
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
          <FilmSchedules
            schedules={state.schedules}
            selectedDate={stores.orderStore.date}
            selectedSeance={stores.orderStore.seance}
            onTimeSelect={functions.onTimeSelect}
          />
          <Button asChild>
            <Link
              className={cn('md:max-w-82', {
                'pointer-events-none opacity-50': !stores.orderStore.seance,
              })}
              disabled={!stores.orderStore.seance}
              to="/order"
            >
              Продолжить
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}

export const Route = createFileRoute('/films/$filmId')({
  component: FilmPage,
})
