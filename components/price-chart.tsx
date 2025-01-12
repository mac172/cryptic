'use client'

import { useState, useEffect } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { formatCurrency, formatDate } from '../utils/format'
import { Loader2 } from 'lucide-react'

interface ChartData {
  timestamp: number
  price: number
  volume: number
}

interface PriceChartProps {
  coinId: string
  name?: string
}

const timeRanges = [
  { label: '24h', days: 1 },
  { label: '7d', days: 7 },
  { label: '30d', days: 30 },
  { label: '90d', days: 90 },
  { label: '1y', days: 365 },
]

export function PriceChart({ coinId, name = '' }: PriceChartProps) {
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [selectedRange, setSelectedRange] = useState(timeRanges[1])
  const [isLoading, setIsLoading] = useState(false)
  const [view, setView] = useState<'price' | 'volume'>('price')

  useEffect(() => {
    const fetchChartData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${selectedRange.days}&interval=${selectedRange.days === 1 ? 'hourly' : 'daily'}`
        )

        if (!response.ok) throw new Error('Failed to fetch chart data')

        const data = await response.json()

        const formattedData = data.prices.map((price: [number, number], index: number) => ({
          timestamp: price[0],
          price: price[1],
          volume: data.total_volumes[index]?.[1] || 0,
        }))

        setChartData(formattedData)
      } catch (error) {
        console.error('Failed to fetch chart data:', error)
        setChartData([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchChartData()
  }, [coinId, selectedRange])

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="rounded-lg border bg-background p-4 shadow-md">
          <p className="text-sm text-muted-foreground">
            {formatDate(data.timestamp, selectedRange.days)}
          </p>
          <p className="font-bold text-lg">
            {view === 'price'
              ? formatCurrency(data.price)
              : `Volume: ${formatCurrency(data.volume)}`
            }
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>{name} Price Chart</CardTitle>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Tabs value={view} onValueChange={(v) => setView(v as 'price' | 'volume')}>
              <TabsList>
                <TabsTrigger value="price">Price</TabsTrigger>
                <TabsTrigger value="volume">Volume</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex flex-wrap gap-2">
              {timeRanges.map((range) => (
                <Button
                  key={range.label}
                  variant={selectedRange === range ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedRange(range)}
                  disabled={isLoading}
                >
                  {range.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-10">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          )}
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--border)"
                vertical={false}
              />
              <XAxis
                dataKey="timestamp"
                tickFormatter={(value) => formatDate(value, selectedRange.days)}
                stroke="var(--muted-foreground)"
                tick={{ fill: 'var(--muted-foreground)' }}
              />
              <YAxis
                dataKey={view}
                domain={['auto', 'auto']}
                tickFormatter={(value) =>
                  view === 'price'
                    ? formatCurrency(value)
                    : formatCurrency(value, 0)
                }
                stroke="var(--muted-foreground)"
                tick={{ fill: 'var(--muted-foreground)' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey={view}
                stroke="hsl(var(--primary))"
                fillOpacity={1}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}


