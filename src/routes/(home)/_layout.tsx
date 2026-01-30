import { createFileRoute, Outlet } from '@tanstack/react-router'

const MainPageLayout = () => (
  <div className="flex flex-col gap-6 py-3 md:py-12">
    <h1 className="pb-3 text-2xl font-bold md:py-0">Афиша</h1>
    <Outlet />
  </div>
)

export const Route = createFileRoute('/(home)/_layout')({
  component: MainPageLayout,
})
