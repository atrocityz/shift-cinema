import type { ComponentProps } from 'react'

import { useState } from 'react'

import type { Film } from '@/generated/api'

import { StarRating } from '@/components/ui'
import { kinopoiskRatingToStarsRating } from '@/utils/helpers'

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
    <div className="text-gray-50">
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

export const FilmCard = ({ film, ...props }: FilmCardProps) => (
  <div className="flex flex-col gap-8 md:flex-row" {...props}>
    <img alt="" className="h-100 rounded-lg object-cover" src={film.img} />
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl md:text-5xl">{film.name}</h1>
      <div className="grid gap-2">
        <StarRating
          rating={kinopoiskRatingToStarsRating(
            Number(film.userRatings.kinopoisk),
          )}
        />
        <span className="text-sm text-gray-400">
          Кинопоиск - {film.userRatings.kinopoisk}
        </span>
      </div>
      <FilmCardDescription>{film.description}</FilmCardDescription>
    </div>
  </div>
)
