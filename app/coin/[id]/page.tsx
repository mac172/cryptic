import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { getCryptoDetail } from '@/actions/crypto'
import { CoinDetails } from '@/components/coin-details'
import { CoinChart } from '@/components/coin-chart'

interface CoinPageProps {
  params: {
    id: string
  }
}

export default async function CoinPage({ params }: CoinPageProps) {
  let coinData;
  
  try {
    coinData = await getCryptoDetail(params.id)
  } catch (error) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-6 space-y-6">
        <Suspense fallback={<div>Loading coin details...</div>}>
          <CoinDetails data={coinData} />
        </Suspense>
        <Suspense fallback={<div>Loading price chart...</div>}>
          <CoinChart coinId={params.id} />
        </Suspense>
      </div>
    </div>
  )
}

