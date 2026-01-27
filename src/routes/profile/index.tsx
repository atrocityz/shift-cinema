import { createFileRoute } from '@tanstack/react-router'

const ProfilePage = () => {
  return <div>Профиль</div>
}

export const Route = createFileRoute('/profile/')({
  component: ProfilePage,
})
