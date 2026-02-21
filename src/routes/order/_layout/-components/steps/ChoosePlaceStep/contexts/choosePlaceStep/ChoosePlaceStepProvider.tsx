import type { ReactNode } from 'react'

import { useRouter } from '@tanstack/react-router'
import { useMemo } from 'react'

import { ChoosePlaceStepContext } from './ChoosePlaceStepContext'

interface ChoosePlaceStepProviderProps {
  children: ReactNode
}

export const ChoosePlaceStepProvider = ({
  children,
}: ChoosePlaceStepProviderProps) => {
  const router = useRouter()

  const onBackButtonClick = () => router.history.back()

  const value = useMemo(
    () => ({
      onBackButtonClick,
    }),
    [onBackButtonClick],
  )

  return (
    <ChoosePlaceStepContext value={value}>{children}</ChoosePlaceStepContext>
  )
}
