import type { ReactNode } from 'react'

import type { Step } from '@/utils/stores'

import { useOrderStore } from '@/utils/stores'

import {
  ChoosePlaceStep,
  PaymentStep,
  ProfileDataStep,
  SuccessStep,
} from './steps'

const component: Record<Step, ReactNode> = {
  'choose-place': <ChoosePlaceStep />,
  'profile-data': <ProfileDataStep />,
  payment: <PaymentStep />,
  success: <SuccessStep />,
}

export const StepsContainer = () => {
  const step = useOrderStore((state) => state.step)

  return <div className="grid gap-6">{component[step]}</div>
}
