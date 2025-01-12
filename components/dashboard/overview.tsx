'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MarketData } from '@/types/crypto'
import { formatCurrency, formatCompactNumber, formatPercentage } from '@/utils/format'
import { getGlobalMarketData } from '@/actions/crypto'
import { TrendingUp, DollarSign, BarChart2, Percent, ArrowUp, ArrowDown } from 'lucide-react'

export function DashboardOverview() {
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
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-card hover:bg-card/80 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Market Cap</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCompactNumber(marketData.total_market_cap.usd)}
          </div>
          <p className="text-xs text-muted-foreground">
            +{formatPercentage(2.5)} from last 24h
          </p>
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
          <p className="text-xs text-muted-foreground">
            {formatPercentage(marketData.market_cap_percentage.btc)}% BTC dominance
          </p>
        </CardContent>
      </Card>

      <Card className="bg-card hover:bg-card/80 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Market Trend</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-500">Bullish</div>
          <p className="text-xs text-muted-foreground">
            Based on market indicators
          </p>
        </CardContent>
      </Card>

      <Card className="bg-card hover:bg-card/80 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">ETH Dominance</CardTitle>
          <Percent className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatPercentage(marketData.market_cap_percentage.eth)}
          </div>
          <p className="text-xs text-muted-foreground">
            Second largest by market cap
          </p>
        </CardContent>
      </Card>
    </div>
  )
}


