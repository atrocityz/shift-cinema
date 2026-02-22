import { ChoosePlaceStepDesktopView } from './components/ChoosePlaceStepDesktopView'
import { ChoosePlaceStepMobileView } from './components/ChoosePlaceStepMobileView'

export const ChoosePlaceStep = () => (
  <div className="flex flex-1 flex-col gap-6">
    <ChoosePlaceStepDesktopView />
    <ChoosePlaceStepMobileView />
  </div>
)
