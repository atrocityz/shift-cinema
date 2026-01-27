import type { QueryClient } from '@tanstack/react-query'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { Layout } from '@/components/layout'

interface RouterContext {
  queryClient: QueryClient
}

const Root = () => (
  <>
    <Layout>
      <Outlet />
    </Layout>
    <TanStackRouterDevtools />
    <ReactQueryDevtools />
  </>
)

export const Route = createRootRouteWithContext<RouterContext>()({
  component: Root,
})
