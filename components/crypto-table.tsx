'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ArrowUpDown } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { CryptoAsset } from '../types/crypto'
import { formatCurrency, formatPercentage } from '../utils/format'
import { PriceChart } from './price-chart'
import Link from 'next/link'

interface CryptoTableProps {
  initialData: CryptoAsset[]
}

export function CryptoTable({ initialData }: CryptoTableProps) {
  const [data, setData] = useState(initialData)
  const [sortConfig, setSortConfig] = useState<{
    key: keyof CryptoAsset
    direction: 'asc' | 'desc'
  }>({ key: 'market_cap_rank', direction: 'asc' })
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoAsset | null>(null)

  const handleSort = (key: keyof CryptoAsset) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === 'asc'
          ? 'desc'
          : 'asc',
    })
  }

  useEffect(() => {
    const sortedData = [...data].sort((a, b) => {
      if (sortConfig.direction === 'asc') {
        return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1
      }
      return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1
    })
    setData(sortedData)
  }, [sortConfig])

  return (
    <div className="space-y-4">
      {selectedCrypto && (
        <PriceChart
          data={selectedCrypto.sparkline_in_7d.price}
          name={selectedCrypto.name}
        />
      )}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('current_price')}
                >
                  Price
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('price_change_percentage_24h')}
                >
                  24h %
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('market_cap')}
                >
                  Market Cap
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('total_volume')}
                >
                  Volume(24h)
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((crypto) => (
              <TableRow
                key={crypto.id}
                className="cursor-pointer hover:bg-muted/80 transition-colors"
              >
                <TableCell>{crypto.market_cap_rank}</TableCell>
                <TableCell>
                  <Link href={`/coin/${crypto.id}`} className="flex items-center space-x-2">
                    <Image
                      src={crypto.image}
                      alt={crypto.name}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    <div>
                      <div className="font-medium">{crypto.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {crypto.symbol.toUpperCase()}
                      </div>
                    </div>
                  </Link>
                </TableCell>
                <TableCell>{formatCurrency(crypto.current_price)}</TableCell>
                <TableCell
                  className={
                    crypto.price_change_percentage_24h > 0
                      ? 'text-emerald-400'
                      : 'text-red-400'
                  }
                >
                  {formatPercentage(crypto.price_change_percentage_24h)}
                </TableCell>
                <TableCell>{formatCurrency(crypto.market_cap)}</TableCell>
                <TableCell>{formatCurrency(crypto.total_volume)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

