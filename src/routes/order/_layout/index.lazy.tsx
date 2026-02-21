import { createLazyFileRoute, getRouteApi } from '@tanstack/react-router'

import { StepsContainer } from './-components/StepsContainer'
import { OrderProvider } from './-contexts/order'

const routeApi = getRouteApi('/order/_layout/')

const OrderPage = () => {
  const search = routeApi.useSearch()
  const { film, seance } = routeApi.useLoaderData()

  return (
    <OrderProvider date={search.date} film={film} seance={seance}>
      <StepsContainer />
    </OrderProvider>
  )
}

export const Route = createLazyFileRoute('/order/_layout/')({
  component: OrderPage,
})
