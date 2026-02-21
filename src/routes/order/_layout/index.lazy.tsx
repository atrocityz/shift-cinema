import { createLazyFileRoute, getRouteApi } from '@tanstack/react-router'

import { StepsContainer } from './-components/StepsContainer'
import { OrderProvider } from './-contexts'

const routeApi = getRouteApi('/order/_layout/')

const OrderPage = () => {
  const search = routeApi.useSearch()
  const seance = routeApi.useLoaderData()

  return (
    <OrderProvider date={search.date} filmId={search.filmId} seance={seance}>
      <StepsContainer />
    </OrderProvider>
  )
}

export const Route = createLazyFileRoute('/order/_layout/')({
  component: OrderPage,
})

