import { Link } from '@tanstack/react-router'

import { FilmIcon, ProfileIcon, TicketsIcon } from '@/components/icons'

export const MobileBottomNav = () => (
  <nav className="bg-background fixed right-0 bottom-0 left-0 z-10 border-t border-gray-400 sm:hidden dark:border-gray-400/30">
    <ul className="container flex items-center justify-around py-4">
      <li>
        <Link
          className="hover:text-primary flex flex-col items-center gap-1 text-sm font-medium transition-colors"
          activeProps={{
            className: 'text-primary pointer-events-none',
            'aria-disabled': true,
            tabIndex: -1,
          }}
          to="/"
        >
          <FilmIcon className="size-6" />
          Афиша
        </Link>
      </li>
      <li>
        <Link
          className="hover:text-primary flex flex-col items-center gap-1 text-sm font-medium transition-colors"
          activeProps={{
            className: 'text-primary pointer-events-none',
            'aria-disabled': true,
            tabIndex: -1,
          }}
          to="/profile"
        >
          <ProfileIcon className="size-6" />
          Профиль
        </Link>
      </li>
      <li>
        <Link
          className="hover:text-primary flex flex-col items-center gap-1 text-sm font-medium transition-colors"
          activeProps={{
            className: 'text-primary pointer-events-none',
            'aria-disabled': true,
            tabIndex: -1,
          }}
          to="/tickets"
        >
          <TicketsIcon className="size-6" />
          Билеты
        </Link>
      </li>
    </ul>
  </nav>
)
