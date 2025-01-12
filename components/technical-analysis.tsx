'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PriceChart } from './price-chart'

const timeframes = ['1H', '4H', '1D', '1W']
const indicators = ['MA', 'RSI', 'MACD', 'BB']

export function TechnicalAnalysis() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D')
  const [selectedIndicators, setSelectedIndicators] = useState<string[]>(['MA'])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Technical Analysis</CardTitle>
            <div className="flex gap-2">
              <Tabs value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <TabsList>
                  {timeframes.map((tf) => (
                    <TabsTrigger key={tf} value={tf}>
                      {tf}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <PriceChart coinId="bitcoin" name="Bitcoin" />
            <PriceChart coinId="ethereum" name="Ethereum" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


