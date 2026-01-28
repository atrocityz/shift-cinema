import type { ComponentProps } from 'react'

import { Link } from '@tanstack/react-router'

import type { Film } from '@/generated/api'

import { Button, StarRating } from '@/components/ui'
import { kinopoiskRatingToStarsRating } from '@/utils/helpers'

interface FilmCardListItemProps extends ComponentProps<'li'> {
  film: Film
}

export const FilmCardListItem = ({ film, ...props }: FilmCardListItemProps) => (
  <li
    {...props}
    className="hover:border-primary relative flex flex-col gap-4 overflow-hidden rounded-xl border border-transparent transition-colors hover:bg-gray-400 dark:hover:bg-gray-400/5"
  >
    <img
      alt=""
      className="h-130 rounded-lg object-cover"
      src={`${import.meta.env.VITE_BASE_API_URL}/api/${film.img}`}
    />
    <div className="z-10 flex flex-col gap-4 px-2">
      <div className="flex flex-col">
        <h2 className="text-[20px] font-semibold">{film.name}</h2>
        <span className="text-sm text-gray-500">{film.releaseDate}</span>
      </div>
      <div>
        <StarRating
          rating={kinopoiskRatingToStarsRating(
            Number(film.userRatings.kinopoisk),
          )}
        />
        <span>Кинопоиск - {film.userRatings.kinopoisk}</span>
      </div>
    </div>
    <Button asChild>
      <Link
        className="mt-auto after:absolute after:inset-0"
        params={{ filmId: film.id }}
        to="/films/$filmId"
      >
        Подробнее
      </Link>
    </Button>
  </li>
)
