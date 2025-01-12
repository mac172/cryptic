'use client'

import { useEffect, useState } from 'react'
import { TrendingUp, DollarSign, BarChart2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MarketData } from '../types/crypto'
import { formatCurrency, formatCompactNumber } from '../utils/format'
import { getGlobalMarketData } from '../actions/crypto'

export function MarketOverview() {
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
    const interval = setInterval(fetchMarketData, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [])

  if (!marketData) return null

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="bg-card hover:bg-card/80 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Market Cap</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCompactNumber(marketData.total_market_cap.usd)}
          </div>
        </CardContent>
      </Card>
      <Card className="bg-card hover:bg-card/80 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">24h Volume</CardTitle>
          <BarChart2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCompactNumber(marketData.total_volume.usd)}
          </div>
        </CardContent>
      </Card>
      <Card className="bg-card hover:bg-card/80 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">BTC Dominance</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {marketData.market_cap_percentage.btc.toFixed(1)}%
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

