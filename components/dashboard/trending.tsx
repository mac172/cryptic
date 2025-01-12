'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency, formatPercentage } from '@/utils/format'
import { CryptoAsset } from '@/types/crypto'
import { getTopCryptos } from '@/actions/crypto'

export function TrendingCoins() {
  const [trendingCoins, setTrendingCoins] = useState<CryptoAsset[]>([])

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const data = await getTopCryptos(1, 6)
        setTrendingCoins(data)
      } catch (error) {
        console.error('Failed to fetch trending coins:', error)
      }
    }

    fetchTrending()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trending Coins</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {trendingCoins.map((coin) => (
            <Link
              key={coin.id}
              href={`/coin/${coin.id}`}
              className="block space-y-2 rounded-lg border p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Image
                  src={coin.image}
                  alt={coin.name}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <span className="font-medium">{coin.name}</span>
                <span className="text-xs text-muted-foreground">
                  {coin.symbol.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">{formatCurrency(coin.current_price)}</span>
                <span
                  className={`text-sm ${coin.price_change_percentage_24h > 0
                      ? 'text-green-500'
                      : 'text-red-500'
                    }`}
                >
                  {formatPercentage(coin.price_change_percentage_24h)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


