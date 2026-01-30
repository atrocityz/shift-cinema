import { ChevronLeft } from 'lucide-react'

import { Button } from '@/components/ui'

interface StepInfoProps {
  maxSteps?: number
  step: number
  title: string
  onBackClick: () => void
}

export const StepInfo = ({
  onBackClick,
  step,
  maxSteps = 3,
  title,
}: StepInfoProps) => (
  <>
    <h1 className="sr-only text-2xl font-bold md:not-sr-only">{title}</h1>
    <Button
      aria-label="Вернуться назад"
      className="justify-start gap-8 px-0! pt-0 pb-3 text-2xl font-bold md:hidden"
      title="Вернуться назад"
      variant="ghost"
      onClick={onBackClick}
    >
      <ChevronLeft className="size-6" />
      <span aria-hidden>{title}</span>
    </Button>
    <div className="grid gap-2">
      <h3 className="text-sm">
        Шаг {step} из {maxSteps}
      </h3>
      <div className="relative h-1 w-full max-w-92 overflow-hidden rounded-4xl bg-gray-400">
        <div
          className="absolute h-full rounded-4xl bg-green-400 transition-all duration-300"
          style={{ width: `${(step / maxSteps) * 100}%` }}
        />
      </div>
    </div>
  </>
)
