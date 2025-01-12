import { DashboardLayout } from '@/components/layouts/dashboard-layout'
import { MarketOverview } from '@/components/market-overview'
import { CryptoTable } from '@/components/crypto-table'
import { getTopCryptos } from '@/actions/crypto'

export default async function MarketsPage() {
  const cryptos = await getTopCryptos(1, 100) // Get top 100 cryptos

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Markets</h1>
        </div>
        <MarketOverview />
        <CryptoTable initialData={cryptos} />
      </div>
    </DashboardLayout>
  )
}


