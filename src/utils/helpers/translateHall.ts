import type { FilmHall } from '@/generated/api'

export const translateHall = (hallName: FilmHall['name']) => {
  switch (hallName) {
    case 'Red':
      return 'Красный'
    case 'Blue':
      return 'Синий'
    case 'Green':
      return 'Зелёный'
    default:
      return hallName
  }
}
