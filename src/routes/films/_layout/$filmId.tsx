import { createFileRoute, Link } from '@tanstack/react-router'

import { Button, CustomLoader } from '@/components/ui'
import { filmByIdQueryOptions, filmScheduleOptions } from '@/utils/api/options'
import { cn } from '@/utils/lib'

import { FilmCard } from './-components/FilmCard'
import { FilmSchedules } from './-components/FilmSchedule'
import { useMoviePage } from './-hooks'

const FilmPage = () => {
  const { state, functions } = useMoviePage()

  return (
    <>
      <FilmCard className="md:mb-6" film={state.film} />
      <div className="grid gap-12">
        <FilmSchedules
          schedules={state.schedules}
          selectedDate={state.selectedDate}
          selectedSeance={state.selectedSeance}
          onTimeSelect={functions.onTimeSelect}
        />
        <Button asChild>
          <Link
            className={cn('md:max-w-82', {
              'pointer-events-none opacity-50':
                !state.selectedDate || !state.selectedSeance,
            })}
            search={{
              filmId: state.film.id,
              date: state.selectedDate ?? '',
              seanceTime: state.selectedSeance?.time ?? '',
            }}
            to="/order"
          >
            Продолжить
          </Link>
        </Button>
      </div>
    </>
  )
}

export const Route = createFileRoute('/films/_layout/$filmId')({
  component: FilmPage,
  loader: ({ context, params }) => {
    return Promise.all([
      context.queryClient.ensureQueryData(
        filmByIdQueryOptions({
          path: {
            filmId: params.filmId,
          },
        }),
      ),
      context.queryClient.ensureQueryData(
        filmScheduleOptions({
          path: {
            filmId: params.filmId,
          },
        }),
      ),
    ])
  },
  errorComponent: () => <p className="text-center text-2xl">Фильм не найден</p>,
  pendingComponent: CustomLoader,
})
