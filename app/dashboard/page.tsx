import { DashboardLayout } from '@/components/layouts/dashboard-layout'
import { DashboardOverview } from '@/components/dashboard/overview'
import { TrendingCoins } from '@/components/dashboard/trending'
import { PriceChart } from '@/components/price-chart'

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>
        <DashboardOverview />
        <div className="grid gap-6 md:grid-cols-2">
          <TrendingCoins />
          <PriceChart coinId="bitcoin" name="Bitcoin" />
        </div>
      </div>
    </DashboardLayout>
  )
}


