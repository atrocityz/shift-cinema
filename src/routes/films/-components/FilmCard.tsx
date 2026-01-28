import type { ComponentProps } from 'react'

import { useState } from 'react'

import type { Film } from '@/generated/api'

import { StarRating } from '@/components/ui'
import { kinopoiskRatingToStarsRating } from '@/utils/helpers'
import { cn } from '@/utils/lib'

interface FilmCardDescriptionProps {
  children: string
  limit?: number
}

const FilmCardDescription = ({
  children,
  limit = 150,
}: FilmCardDescriptionProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  if (children.length <= limit) {
    return <p className="text-gray-50">{children}</p>
  }

  const displayText = isExpanded ? children : `${children.slice(0, limit)}...`

  return (
    <div className="text-gray-700 dark:text-gray-50">
      <div className="md:hidden">
        <p>
          {displayText}
          {!isExpanded && (
            <button
              className="ml-2 text-gray-500 hover:underline focus:outline-none"
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              раскрыть
            </button>
          )}
        </p>
      </div>

      <div className="hidden md:block">
        <p>{children}</p>
      </div>
    </div>
  )
}

interface FilmCardProps extends ComponentProps<'div'> {
  film: Film
}

export const FilmCard = ({ film, className, ...props }: FilmCardProps) => (
  <div className={cn('flex flex-col gap-8 md:flex-row', className)} {...props}>
    <img
      alt=""
      className="h-100 w-full rounded-lg object-cover md:max-w-67"
      height={400}
      src={film.img}
      width={267}
    />
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl md:text-5xl">{film.name}</h1>
      <div className="grid gap-2">
        <StarRating
          rating={kinopoiskRatingToStarsRating(
            Number(film.userRatings.kinopoisk),
          )}
        />
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Кинопоиск - {film.userRatings.kinopoisk}
        </span>
      </div>
      <FilmCardDescription>{film.description}</FilmCardDescription>
    </div>
  </div>
)
