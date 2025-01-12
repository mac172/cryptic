import { DashboardLayout } from '@/components/layouts/dashboard-layout'
import { GlobalMarkets } from '@/components/global-markets'

export default function GlobalMarketsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Global Markets</h1>
        </div>
        <GlobalMarkets />
      </div>
    </DashboardLayout>
  )
}


