import { createContext } from 'react'

interface ChoosePlaceStepContextState {
  onBackButtonClick: () => void
}

const initialState: ChoosePlaceStepContextState = {
  onBackButtonClick: () => {},
}

export const ChoosePlaceStepContext =
  createContext<ChoosePlaceStepContextState>(initialState)
