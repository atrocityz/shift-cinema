import { createFileRoute, Outlet } from '@tanstack/react-router'

const OrderPageLayout = () => (
  <div className="flex min-h-dvh flex-col py-3 md:min-h-auto md:pt-12 md:pb-4">
    <Outlet />
  </div>
)

export const Route = createFileRoute('/order/_layout')({
  component: OrderPageLayout,
})
