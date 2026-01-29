import { createFileRoute } from '@tanstack/react-router'

const MainPage = () => {
  return <div>MainPage</div>
}

export const Route = createFileRoute('/')({
  component: MainPage,
})
