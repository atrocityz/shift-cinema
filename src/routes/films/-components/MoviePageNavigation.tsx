import { Link } from '@tanstack/react-router'
import { ChevronLeft, X } from 'lucide-react'

import { Button } from '@/components/ui'

export const MoviePageNavigation = () => (
  <>
    <Button asChild className="md:hidden" variant="ghost">
      <Link
        className="inline-flex w-full items-center justify-start gap-8 text-2xl font-bold"
        to="/"
      >
        <X className="size-6" /> О фильме
      </Link>
    </Button>
    <Button
      asChild
      className="hidden gap-4 py-6 font-medium text-gray-400 md:inline-flex"
      variant="ghost"
    >
      <Link to="/">
        <ChevronLeft className="size-6" /> Назад
      </Link>
    </Button>
  </>
)
