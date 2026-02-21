import { createFileRoute } from '@tanstack/react-router'

import { CustomLoader } from '@/components/ui'
import { filmsQueryOptions } from '@/utils/api/options'

export const Route = createFileRoute('/(home)/_layout/')({
  loader: ({ context }) => {
    return context.queryClient.ensureQueryData(filmsQueryOptions())
  },
  pendingComponent: CustomLoader,
})
