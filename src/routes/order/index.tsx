import { createFileRoute, redirect } from '@tanstack/react-router'

import { useOrderStore } from '@/utils/stores'

import { StepsContainer } from './-components/StepsContainer'

const OrderPage = () => {
  return (
    <div className="py-3 md:pt-12 md:pb-4">
      <StepsContainer />
    </div>
  )
}

export const Route = createFileRoute('/order/')({
  component: OrderPage,
  beforeLoad: () => {
    const { date, seance, film } = useOrderStore.getState()

    if (!date || !seance || !film) {
      throw redirect({
        to: '/',
      })
    }
  },
})
