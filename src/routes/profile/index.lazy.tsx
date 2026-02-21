import { createLazyFileRoute } from '@tanstack/react-router'

const ProfilePage = () => {
  return <div>Профиль</div>
}

export const Route = createLazyFileRoute('/profile/')({
  component: ProfilePage,
})

