import { createLazyFileRoute } from '@tanstack/react-router'

const TicketsPage = () => {
  return <div>Билеты</div>
}

export const Route = createLazyFileRoute('/tickets/')({
  component: TicketsPage,
})

