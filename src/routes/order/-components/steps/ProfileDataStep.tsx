import { useOrderStore } from '@/utils/stores'

import { StepInfo } from '../StepInfo'

export const ProfileDataStep = () => {
  const orderStore = useOrderStore()

  return (
    <>
      <StepInfo
        step={2}
        title="Введите ваши данные"
        onBackClick={() => orderStore.setStep('choose-place')}
      />
    </>
  )
}
