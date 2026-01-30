import { createFileRoute, getRouteApi, redirect } from '@tanstack/react-router'

import { CustomLoader } from '@/components/ui'
import { filmScheduleOptions } from '@/utils/api/options'

import { StepsContainer } from './-components/StepsContainer'
import { OrderProvider } from './-contexts'

const routeApi = getRouteApi('/order/_layout/')

interface OrderSearch {
  date: string
  filmId: string
  seanceTime: string
}

const OrderPage = () => {
  const search = routeApi.useSearch()
  const seance = routeApi.useLoaderData()

  return (
    <OrderProvider date={search.date} filmId={search.filmId} seance={seance}>
      <StepsContainer />
    </OrderProvider>
  )
}

export const Route = createFileRoute('/order/_layout/')({
  component: OrderPage,
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

    const schedule = scheduleResponse.data.schedules.find(
      (s) => s.date === deps.date,
    )

    if (!schedule) {
      throw new Error('Schedule not found')
    }

    const seance = schedule.seances.find((s) => s.time === deps.seanceTime)

    if (!seance) {
      throw new Error('Seance not found')
    }

    return seance
  },
  onError: () => {
    throw redirect({ to: '/' })
  },
  pendingComponent: CustomLoader,
})
