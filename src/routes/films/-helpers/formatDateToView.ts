import type { FilmSchedule } from '@/generated/api'

export const formatDateToView = (date: FilmSchedule['date']) => {
  const [day, month, year] = date.split('.').map(Number)

  const dateObj = new Date(2000 + year, month - 1, day)

  const weekday = new Intl.DateTimeFormat('ru-RU', {
    weekday: 'short',
  }).format(dateObj)

  const dayMonth = new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'short',
  }).format(dateObj)

  return `${weekday.charAt(0).toUpperCase() + weekday.slice(1)}, ${dayMonth.replace(' г.', '')}`
}
