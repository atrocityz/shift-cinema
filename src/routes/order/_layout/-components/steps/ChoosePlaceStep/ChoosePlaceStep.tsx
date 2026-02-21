import { ChoosePlaceStepDesktopView } from './components/ChoosePlaceStepDesktopView/ChoosePlaceStepDesktopView'
import { ChoosePlaceStepMobileView } from './components/ChoosePlaceStepMobileView/ChoosePlaceStepMobileView'
import { ChoosePlaceStepProvider } from './contexts/choosePlaceStep'

export const ChoosePlaceStep = () => (
  <div className="flex flex-1 flex-col gap-6">
    <ChoosePlaceStepProvider>
      <ChoosePlaceStepDesktopView />
      <ChoosePlaceStepMobileView />
    </ChoosePlaceStepProvider>
  </div>
)
