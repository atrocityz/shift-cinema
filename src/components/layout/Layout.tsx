import type { ReactNode } from 'react'

import { Link } from '@tanstack/react-router'

import { ExitIcon } from '../icons'
import { Button } from '../ui'
import { Navigation } from './components/Navigation'
import { ThemeToggler } from './components/ThemeToggler'

interface LayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => (
  <div className="flex min-h-dvh flex-col">
    <header className="hidden border-b border-gray-400 py-6 sm:block dark:border-gray-400/30">
      <div className="container flex items-center gap-6">
        <Link aria-label="Главная" className="shrink-0" title="Главная" to="/">
          <img alt="ШИФТ Cinema" height={34} src="/logo.svg" width={118} />
        </Link>
        <Navigation />
        <div className="ml-auto flex items-center gap-8">
          <Button
            className="p-0"
            variant="ghost"
            onClick={() => console.log('logout')}
          >
            <ExitIcon className="size-6" />
            Выйти
          </Button>
          <ThemeToggler />
        </div>
      </div>
    </header>
    <main className="container flex-1">{children}</main>
  </div>
)
