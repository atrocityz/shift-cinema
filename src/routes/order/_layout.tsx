import { createFileRoute, Outlet } from '@tanstack/react-router'

const OrderPageLayout = () => (
  <div className="py-3 md:pt-12 md:pb-4">
    <Outlet />
  </div>
)

export const Route = createFileRoute('/order/_layout')({
  component: OrderPageLayout,
})
