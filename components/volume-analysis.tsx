'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CryptoAsset } from '@/types/crypto'
import { getTopCryptos } from '@/actions/crypto'
import { formatCurrency, formatPercentage } from '@/utils/format'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function VolumeAnalysis() {
  const [volumeData, setVolumeData] = useState<CryptoAsset[]>([])

  useEffect(() => {
    const fetchVolumeData = async () => {
      try {
        const data = await getTopCryptos(1, 20)
        const sortedByVolume = [...data].sort((a, b) => b.total_volume - a.total_volume)
        setVolumeData(sortedByVolume)
      } catch (error) {
        console.error('Failed to fetch volume data:', error)
      }
    }

    fetchVolumeData()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Volume Leaders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Coin</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>24h Volume</TableHead>
              <TableHead>Volume/Market Cap</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {volumeData.map((coin) => (
              <TableRow key={coin.id}>
                <TableCell className="font-medium">{coin.name}</TableCell>
                <TableCell>{formatCurrency(coin.current_price)}</TableCell>
                <TableCell>{formatCurrency(coin.total_volume)}</TableCell>
                <TableCell>
                  {formatPercentage((coin.total_volume / coin.market_cap) * 100)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}


