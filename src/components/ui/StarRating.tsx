import { Star } from 'lucide-react'

interface StarRatingProps {
  rating: number
}

const STAR_MAX_RATING = 5

export const StarRating = ({ rating = STAR_MAX_RATING }: StarRatingProps) => (
  <div aria-label={`${rating} рейтинг`} className="flex items-center gap-0.5">
    {Array.from({ length: STAR_MAX_RATING }).map((_, index) => {
      const fillPercentage = Math.min(Math.max(rating - index, 0), 1) * 100

      return (
        <div key={index} className="relative h-6 w-6">
          <Star className="h-6 w-6 text-gray-400" fill="currentColor" />

          <div
            className="absolute top-0 left-0 h-full overflow-hidden"
            style={{ width: `${fillPercentage}%` }}
          >
            <Star className="h-6 w-6 text-yellow-500" fill="currentColor" />
          </div>
        </div>
      )
    })}
  </div>
)
