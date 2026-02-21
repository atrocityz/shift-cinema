import { createFileRoute, redirect } from '@tanstack/react-router'

import { CustomLoader } from '@/components/ui'
import { filmByIdQueryOptions, filmScheduleOptions } from '@/utils/api/options'

interface OrderSearch {
  date: string
  filmId: string
  seanceTime: string
}

export const Route = createFileRoute('/order/_layout/')({
  validateSearch: (search: Record<string, unknown>): OrderSearch => {
    const filmId = search.filmId as string
    const date = search.date as string
    const seanceTime = search.seanceTime as string

    if (!filmId || !date || !seanceTime) {
      throw redirect({ to: '/' })
    }

    return { filmId, date, seanceTime }
  },
  loaderDeps: ({ search }) => ({
    filmId: search.filmId,
    date: search.date,
    seanceTime: search.seanceTime,
  }),
  loader: async ({ context, deps }) => {
    const scheduleResponse = await context.queryClient.ensureQueryData(
      filmScheduleOptions({
        path: {
          filmId: deps.filmId,
        },
      }),
    )
    const filmResponse = await context.queryClient.ensureQueryData(
      filmByIdQueryOptions({
        path: {
          filmId: deps.filmId,
        },
      }),
    )

    const schedule = scheduleResponse.data.schedules.find(
      (s) => s.date === deps.date,
    )

    if (filmResponse.data.reason) {
      throw new Error(filmResponse.data.reason)
    }

    if (!schedule) {
      throw new Error('Schedule not found')
    }

    const seance = schedule.seances.find((s) => s.time === deps.seanceTime)
    const film = filmResponse.data.film

    if (!seance) {
      throw new Error('Seance not found')
    }

    return { seance, film }
  },
  onError: () => {
    throw redirect({ to: '/' })
  },
  pendingComponent: CustomLoader,
})
