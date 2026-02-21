import { createFileRoute } from '@tanstack/react-router'

import { CustomLoader } from '@/components/ui'
import { filmByIdQueryOptions, filmScheduleOptions } from '@/utils/api/options'

export const Route = createFileRoute('/films/_layout/$filmId')({
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
