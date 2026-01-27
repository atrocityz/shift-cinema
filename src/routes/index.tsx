import { createFileRoute } from '@tanstack/react-router'

import { Button } from '@/components/ui'

const MainPage = () => {
  return (
    <div>
      MainPage
      <Button>123</Button>
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: MainPage,
})
