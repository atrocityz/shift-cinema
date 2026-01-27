import { createFileRoute } from '@tanstack/react-router'

const TicketsPage = () => {
  return <div>Билеты</div>
}

export const Route = createFileRoute('/tickets/')({
  component: TicketsPage,
})
