import { useOrder } from '../../-contexts'
import { StepInfo } from '../StepInfo'

export const ProfileDataStep = () => {
  const { setStep } = useOrder()

  return (
    <>
      <StepInfo
        step={2}
        title="Введите ваши данные"
        onBackClick={() => setStep('choose-place')}
      />
    </>
  )
}
