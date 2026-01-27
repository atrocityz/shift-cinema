import { createFileRoute, useParams } from '@tanstack/react-router'

const FilmPage = () => {
  const { filmId } = useParams({ from: '/films/$filmId' })
  return <div>{filmId}</div>
}

export const Route = createFileRoute('/films/$filmId')({
  component: FilmPage,
})
