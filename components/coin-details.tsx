'use client'

import { ArrowUp, ArrowDown, DollarSign, BarChart2, TrendingUp, Globe, Twitter, MessageCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CryptoDetail } from '../types/crypto'
import { formatCurrency, formatNumber, formatPercentage } from '../utils/format'
import Image from 'next/image'

interface CoinDetailsProps {
  data: CryptoDetail
}

export function CoinDetails({ data }: CoinDetailsProps) {
  const priceChange24h = data.market_data.price_change_percentage_24h
  const isPriceUp = priceChange24h > 0

  const PriceChangeCard = ({ period, value }: { period: string; value: number | undefined }) => (
    <Card className="bg-card hover:bg-card/80 transition-colors">
      <CardContent className="pt-6">
        <div className="text-sm text-muted-foreground">{period}</div>
        <div className={`text-lg font-bold ${value && value > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
          {value ? formatPercentage(value) : 'N/A'}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Image
          src={data.image.large}
          alt={data.name}
          width={64}
          height={64}
          className="rounded-full"
        />
        <div>
          <h1 className="text-3xl font-bold">{data.name}</h1>
          <p className="text-xl text-muted-foreground">{data.symbol.toUpperCase()}</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-3xl font-bold">
            {formatCurrency(data.market_data.current_price.usd)}
          </span>
          <span
            className={`flex items-center ${isPriceUp ? 'text-emerald-400' : 'text-red-400'
              }`}
          >
            {isPriceUp ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
            {formatPercentage(priceChange24h)}
          </span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-card hover:bg-card/80 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Market Cap</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(data.market_data.market_cap.usd)}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card hover:bg-card/80 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">24h Trading Vol</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(data.market_data.total_volume.usd)}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card hover:bg-card/80 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">24h Range</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(data.market_data.low_24h.usd)} - {formatCurrency(data.market_data.high_24h.usd)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="price">Price History</TabsTrigger>
          <TabsTrigger value="supply">Supply</TabsTrigger>
          {(data.links?.twitter_screen_name || data.links?.subreddit_url || data.links?.homepage?.[0]) && (
            <TabsTrigger value="social">Social</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="overview">
          <Card className="bg-card">
            <CardContent className="pt-6">
              <div className="prose prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: data.description?.en || 'No description available.' }} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="price">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <PriceChangeCard period="7d Change" value={data.market_data.price_change_percentage_7d} />
            <PriceChangeCard period="14d Change" value={data.market_data.price_change_percentage_14d} />
            <PriceChangeCard period="30d Change" value={data.market_data.price_change_percentage_30d} />
            <PriceChangeCard period="1y Change" value={data.market_data.price_change_percentage_1y} />
          </div>
          <div className="grid gap-4 mt-4 md:grid-cols-2">
            {data.market_data.ath?.usd && (
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle>All Time High</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(data.market_data.ath.usd)}</div>
                  <div className="text-sm text-muted-foreground">
                    {data.market_data.ath_date?.usd &&
                      new Date(data.market_data.ath_date.usd).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            )}
            {data.market_data.atl?.usd && (
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle>All Time Low</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(data.market_data.atl.usd)}</div>
                  <div className="text-sm text-muted-foreground">
                    {data.market_data.atl_date?.usd &&
                      new Date(data.market_data.atl_date.usd).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="supply">
          <div className="grid gap-4 md:grid-cols-3">
            {data.market_data.circulating_supply && (
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle>Circulating Supply</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatNumber(data.market_data.circulating_supply)}
                  </div>
                </CardContent>
              </Card>
            )}
            {data.market_data.total_supply && (
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle>Total Supply</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatNumber(data.market_data.total_supply)}
                  </div>
                </CardContent>
              </Card>
            )}
            {data.market_data.max_supply && (
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle>Max Supply</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatNumber(data.market_data.max_supply)}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="social">
          <div className="grid gap-4 md:grid-cols-3">
            {data.links?.homepage?.[0] && (
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Website
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <a
                    href={data.links.homepage[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {data.links.homepage[0]}
                  </a>
                </CardContent>
              </Card>
            )}
            {data.links?.twitter_screen_name && (
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Twitter className="h-4 w-4" />
                    Twitter
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <a
                      href={`https://twitter.com/${data.links.twitter_screen_name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      @{data.links.twitter_screen_name}
                    </a>
                  </div>
                </CardContent>
              </Card>
            )}
            {data.links?.subreddit_url && (
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Reddit
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <a
                      href={data.links.subreddit_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Reddit Community
                    </a>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}


