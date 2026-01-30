import { createFileRoute, Outlet } from '@tanstack/react-router'

import { MoviePageNavigation } from './-components/MoviePageNavigation'

const FilmPageLayout = () => {
  return (
    <div className="flex flex-col items-start gap-6 py-4">
      <MoviePageNavigation />
      <Outlet />
    </div>
  )
}

export const Route = createFileRoute('/films/_layout')({
  component: FilmPageLayout,
})
