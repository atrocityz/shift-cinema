import type { FilmScheduleSeance } from '@/generated/api'

export const groupSeancesByHall = (seances: FilmScheduleSeance[]) =>
  seances.reduce(
    (acc, seance) => {
      const hallName = seance.hall.name
      if (!acc[hallName]) {
        acc[hallName] = []
      }
      acc[hallName].push(seance)
      return acc
    },
    {} as Record<string, FilmScheduleSeance[]>,
  )
