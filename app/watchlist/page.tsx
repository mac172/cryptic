'use client'

import { useState, useEffect } from 'react'
import { DashboardLayout } from '@/components/layouts/dashboard-layout'
import { CryptoTable } from '@/components/crypto-table'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<string[]>([])
  const { toast } = useToast()

  useEffect(() => {
    const stored = localStorage.getItem('watchlist')
    if (stored) {
      setWatchlist(JSON.parse(stored))
    }
  }, [])

  const addToWatchlist = (coinId: string) => {
    const newWatchlist = [...watchlist, coinId]
    setWatchlist(newWatchlist)
    localStorage.setItem('watchlist', JSON.stringify(newWatchlist))
    toast({
      title: 'Added to watchlist',
      description: `${coinId} has been added to your watchlist.`,
    })
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Watchlist</h1>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Coin
          </Button>
        </div>
        {watchlist.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold">Your watchlist is empty</h2>
            <p className="text-muted-foreground mt-2">
              Add coins to your watchlist to track them here
            </p>
          </div>
        ) : (
          <CryptoTable initialData={[]} />
        )}
      </div>
    </DashboardLayout>
  )
}


