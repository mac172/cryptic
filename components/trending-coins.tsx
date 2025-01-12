'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency, formatPercentage } from '@/utils/format'
import { CryptoAsset } from '@/types/crypto'
import { getTopCryptos } from '@/actions/crypto'
import { PriceChart } from './price-chart'

export function TrendingCoins() {
  const [trendingCoins, setTrendingCoins] = useState<CryptoAsset[]>([])
  const [selectedCoin, setSelectedCoin] = useState<CryptoAsset | null>(null)

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const data = await getTopCryptos(1, 12)
        setTrendingCoins(data)
        setSelectedCoin(data[0])
      } catch (error) {
        console.error('Failed to fetch trending coins:', error)
      }
    }

    fetchTrending()
  }, [])

  return (
    <div className="space-y-6">
      {selectedCoin && (
        <PriceChart coinId={selectedCoin.id} name={selectedCoin.name} />
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {trendingCoins.map((coin) => (
          <Card
            key={coin.id}
            className={`cursor-pointer transition-colors ${selectedCoin?.id === coin.id ? 'border-primary' : ''
              }`}
            onClick={() => setSelectedCoin(coin)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    src={coin.image}
                    alt={coin.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">{coin.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {coin.symbol.toUpperCase()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {formatCurrency(coin.current_price)}
                  </p>
                  <p
                    className={`text-sm ${coin.price_change_percentage_24h > 0
                        ? 'text-green-500'
                        : 'text-red-500'
                      }`}
                  >
                    {formatPercentage(coin.price_change_percentage_24h)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}


