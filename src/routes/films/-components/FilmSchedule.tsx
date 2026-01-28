import type { ComponentProps } from 'react'

import type { FilmSchedule } from '@/generated/api'

import {
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui'
import { formatDateToView } from '@/routes/films/-helpers/formatDateToView.ts'
import { cn } from '@/utils/lib'

import { groupSeancesByHall } from '../-helpers/groupSeancesByHall'
import { translateHall } from '../-helpers/translateHall'

interface FilmSchedulesProps extends ComponentProps<'div'> {
  schedules: FilmSchedule[]
}

export const FilmSchedules = ({
  schedules,
  className,
  ...props
}: FilmSchedulesProps) => {
  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <h2 className="hidden text-2xl font-bold md:block">Расписание</h2>
      <Tabs className="grid gap-6" defaultValue={schedules[0].date}>
        <div className="-mx-4 w-[calc(100%+2rem)] overflow-x-auto px-4 md:mx-0 md:w-full md:px-0">
          <TabsList className="w-max min-w-full">
            {schedules.map((schedule) => (
              <TabsTrigger key={schedule.date} value={schedule.date}>
                {formatDateToView(schedule.date)}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        {schedules.map((schedule) => {
          const seancesByHall = groupSeancesByHall(schedule.seances)

          return (
            <TabsContent
              key={schedule.date}
              className="grid gap-6"
              value={schedule.date}
            >
              {Object.entries(seancesByHall).map(([hallName, seances]) => (
                <div key={hallName}>
                  <h3 className="mb-4 text-lg font-semibold">
                    <span className="capitalize">
                      {translateHall(hallName)}
                    </span>{' '}
                    зал
                  </h3>
                  <div className="flex flex-wrap items-center gap-2">
                    {seances.map((seance) => (
                      <Button
                        key={`${schedule.date}-${seance.hall.name}-${seance.time}`}
                        className="min-w-18 px-4 py-2.5 text-sm"
                        variant="outline"
                      >
                        {seance.time}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}
