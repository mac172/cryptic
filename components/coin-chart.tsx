'use client'

import { useState, useEffect } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '../utils/format'

interface ChartData {
  timestamp: number
  price: number
}

interface CoinChartProps {
  coinId: string
}

const timeRanges = [
  { label: '24h', days: 1 },
  { label: '7d', days: 7 },
  { label: '30d', days: 30 },
  { label: '90d', days: 90 },
  { label: '1y', days: 365 },
]

export function CoinChart({ coinId }: CoinChartProps) {
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [selectedRange, setSelectedRange] = useState(timeRanges[0])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchChartData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${selectedRange.days}`
        )
        const data = await response.json()
        const formattedData = data.prices.map(([timestamp, price]: [number, number]) => ({
          timestamp,
          price,
        }))
        setChartData(formattedData)
      } catch (error) {
        console.error('Failed to fetch chart data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchChartData()
  }, [coinId, selectedRange])

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    if (selectedRange.days === 1) {
      return date.toLocaleTimeString()
    }
    return date.toLocaleDateString()
  }

  return (
    <Card className="bg-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Price Chart</CardTitle>
          <div className="flex gap-2">
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
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis
                dataKey="timestamp"
                tickFormatter={formatDate}
                stroke="#666"
              />
              <YAxis
                domain={['auto', 'auto']}
                tickFormatter={(value) => formatCurrency(value)}
                stroke="#666"
              />
              <Tooltip
                formatter={(value: number) => [formatCurrency(value), 'Price']}
                labelFormatter={(label) => formatDate(label)}
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

