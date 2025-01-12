import { Suspense } from 'react'
import { DashboardLayout } from '@/components/layouts/dashboard-layout'
import { MarketOverview } from '@/components/market-overview'
import { CryptoTable } from '@/components/crypto-table'
import { getTopCryptos } from '@/actions/crypto'

export default async function Home() {
  const cryptos = await getTopCryptos()

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Crypto Market</h1>
        </div>

        <Suspense fallback={<div>Loading market data...</div>}>
          <MarketOverview />
        </Suspense>

        <Suspense fallback={<div>Loading crypto assets...</div>}>
          <CryptoTable initialData={cryptos} />
        </Suspense>
      </div>
    </DashboardLayout>
  )
}


