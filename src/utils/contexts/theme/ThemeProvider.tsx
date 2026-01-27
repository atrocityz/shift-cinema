import { useLayoutEffect, useMemo, useState } from 'react'

import { LOCAL_STORAGE } from '@/utils/constants'

import type { Theme } from './ThemeContext'

import { ThemeContext } from './ThemeContext'

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
}

export const ThemeProvider = ({
  children,
  defaultTheme = 'dark',
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(
    (localStorage.getItem(LOCAL_STORAGE.THEME) as Theme) || defaultTheme,
  )

  useLayoutEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')
    localStorage.setItem(LOCAL_STORAGE.THEME, theme)
    root.classList.add(theme)
  }, [theme])

  const toggleTheme = async (event: React.MouseEvent) => {
    const x = event.clientX
    const y = event.clientY

    const radius = Math.hypot(window.innerWidth, window.innerHeight)

    await document.startViewTransition(() => {
      setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))
    }).ready

    window.document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${radius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 700,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)',
      },
    )
  }

  const value = useMemo(() => ({ theme, toggleTheme, setTheme }), [theme])

  return <ThemeContext value={value}>{children}</ThemeContext>
}
