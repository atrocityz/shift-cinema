import { useOrder } from '../../-contexts/order'
import { StepInfo } from '../StepInfo'

export const ProfileDataStep = () => {
  const { setStep } = useOrder()

  return (
    <div className="flex flex-1 flex-col gap-6">
      <StepInfo
        step={2}
        title="Введите ваши данные"
        onBackClick={() => setStep('choose-place')}
      />
    </div>
  )
}
