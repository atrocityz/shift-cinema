import { createFileRoute, Link } from '@tanstack/react-router'

import { Button, CustomLoader } from '@/components/ui'
import { filmQueryByIdOptions } from '@/utils/api/options'
import { filmScheduleOptions } from '@/utils/api/options/filmSheduleQueryOptions'
import { cn } from '@/utils/lib'

import { FilmCard } from '../-components/FilmCard'
import { FilmSchedules } from '../-components/FilmSchedule'
import { useMoviePage } from '../-hooks'

const FilmPage = () => {
  const { state, stores, functions } = useMoviePage()

  return (
    <>
      <FilmCard className="md:mb-6" film={state.film} />
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
    </>
  )
}

export const Route = createFileRoute('/films/_layout/$filmId')({
  component: FilmPage,
  loader: ({ context, params }) => {
    return Promise.all([
      context.queryClient.ensureQueryData(
        filmQueryByIdOptions({
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
