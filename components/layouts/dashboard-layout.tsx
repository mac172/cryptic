import { SideNav } from '@/components/layouts/side-nav'
import { TopNav } from '@/components/layouts/top-nav'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <div className="flex">
        <SideNav />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}


