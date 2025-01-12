export interface CryptoAsset {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  price_change_percentage_24h: number
  price_change_percentage_7d: number
  total_volume: number
  sparkline_in_7d: {
    price: number[]
  }
}

export interface MarketData {
  total_market_cap: { usd: number }
  total_volume: { usd: number }
  market_cap_percentage: {
    btc: number
    eth: number
  }
}

export interface CryptoDetail {
  id: string
  symbol: string
  name: string
  description?: { en: string }
  image: { large: string }
  market_data: {
    current_price: { usd: number }
    price_change_percentage_24h: number
    price_change_percentage_7d?: number
    price_change_percentage_14d?: number
    price_change_percentage_30d?: number
    price_change_percentage_1y?: number
    market_cap: { usd: number }
    total_volume: { usd: number }
    high_24h: { usd: number }
    low_24h: { usd: number }
    circulating_supply?: number
    total_supply?: number
    max_supply?: number
    ath?: { usd: number }
    ath_date?: { usd: string }
    atl?: { usd: number }
    atl_date?: { usd: string }
  }
  links?: {
    homepage?: string[]
    blockchain_site?: string[]
    official_forum_url?: string[]
    twitter_screen_name?: string
    telegram_channel_identifier?: string
    subreddit_url?: string
  }
}



