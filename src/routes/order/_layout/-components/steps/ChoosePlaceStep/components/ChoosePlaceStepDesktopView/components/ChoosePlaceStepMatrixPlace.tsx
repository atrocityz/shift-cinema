import type { ComponentProps } from 'react'

import { memo } from 'react'

import type { Place } from '@/routes/order/_layout/-contexts/order'

import { cn } from '@/utils/lib'

interface ChoosePlaceStepMatrixPlaceProps extends ComponentProps<'button'> {
  children: number
  id: string
  isSelected: boolean
  placeNumber: number
  price: number
  row: number
  onSelectPlace: (place: Place) => void
}

export const ChoosePlaceStepMatrixPlace = memo(
  ({
    onSelectPlace,
    children,
    isSelected,
    id,
    placeNumber,
    price,
    row,
    ...props
  }: ChoosePlaceStepMatrixPlaceProps) => (
    <button
      className={cn(
        'bg-primary inline-flex h-4 w-4 cursor-pointer items-center justify-center rounded-xs text-[10px] text-transparent transition-all hover:scale-170 hover:text-white disabled:pointer-events-none disabled:bg-gray-400',
        {
          'bg-primary/30': isSelected,
        },
      )}
      type="button"
      onClick={() => onSelectPlace({ id, price, row, place: placeNumber })}
      {...props}
    >
      {children}
    </button>
  ),
)

ChoosePlaceStepMatrixPlace.displayName = 'ChoosePlaceStepMatrixPlace'
