import { use } from 'react'

import { ChoosePlaceStepContext } from './ChoosePlaceStepContext'

export const useChoosePlaceStepContext = () => {
  const context = use(ChoosePlaceStepContext)

  if (!context) {
    throw new Error(
      'useChoosePlaceStepContext must be used within ChoosePlaceStepProvider',
    )
  }

  return context
}
