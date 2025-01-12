'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MarketData } from '@/types/crypto'
import { getGlobalMarketData } from '@/actions/crypto'
import { formatCurrency, formatCompactNumber, formatPercentage } from '@/utils/format'
import { PriceChart } from './price-chart'

export function GlobalMarkets() {
  const [marketData, setMarketData] = useState<MarketData | null>(null)

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const data = await getGlobalMarketData()
        setMarketData(data)
      } catch (error) {
        console.error('Failed to fetch market data:', error)
      }
    }

    fetchMarketData()
  }, [])

  if (!marketData) return null

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Market Cap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(marketData.total_market_cap.usd)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>24h Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(marketData.total_volume.usd)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>BTC Dominance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatPercentage(marketData.market_cap_percentage.btc)}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <PriceChart coinId="bitcoin" name="Bitcoin" />
        <PriceChart coinId="ethereum" name="Ethereum" />
      </div>
    </div>
  )
}


