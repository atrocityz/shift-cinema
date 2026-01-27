import { Moon, Sun } from 'lucide-react'

import { Button } from '@/components/ui'
import { useTheme } from '@/utils/contexts/theme'

export const ThemeToggler = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      aria-label="Сменить тему"
      size="icon"
      title="Сменить тему"
      variant="ghost"
      onClick={toggleTheme}
    >
      {theme === 'light' ? (
        <Moon className="size-6" />
      ) : (
        <Sun className="size-6" />
      )}
    </Button>
  )
}
