import { DashboardLayout } from '@/components/layouts/dashboard-layout'
import { TrendingCoins } from '@/components/trending-coins'

export default function TrendingPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Trending Coins</h1>
        </div>
        <TrendingCoins />
      </div>
    </DashboardLayout>
  )
}


