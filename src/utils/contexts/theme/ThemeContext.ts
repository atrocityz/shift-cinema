import type { Dispatch, SetStateAction } from 'react'

import { createContext } from 'react'

export type Theme = 'dark' | 'light'

interface ThemeContextState {
  setTheme: Dispatch<SetStateAction<Theme>>
  theme: Theme
  toggleTheme: (event: React.MouseEvent) => void
}

const initialState: ThemeContextState = {
  theme: 'dark',
  setTheme: () => {},
  toggleTheme: () => {},
}

export const ThemeContext = createContext<ThemeContextState>(initialState)
