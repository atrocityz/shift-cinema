import { Link } from '@tanstack/react-router'

import { ProfileIcon, TicketsIcon } from '@/components/icons'

export const Navigation = () => (
  <nav>
    <ul className="flex items-center gap-8">
      <li>
        <Link
          className="hover:text-primary flex items-center gap-3 font-medium transition-colors"
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
          className="hover:text-primary flex items-center gap-3 font-medium transition-colors"
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
