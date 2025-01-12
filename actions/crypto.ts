'use server'

// All the API call handle here!
import { CryptoAsset, MarketData, CryptoDetail } from '../types/crypto'

const COINGECKO_API = 'https://api.coingecko.com/api/v3'


export async function getTopCryptos(page: number = 1, perPage: number = 20): Promise<CryptoAsset[]> {
  const response = await fetch(
    `${COINGECKO_API}/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=true&&x_cg_demo_api_key=${process.env.COINGECKO}`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch crypto data')
  }

  return response.json()
}

export async function getGlobalMarketData(): Promise<MarketData> {
  const response = await fetch(`${COINGECKO_API}/global?vs_currency=inr&&x_cg_demo_api_key=${process.env.COINGECKO}`)

  if (!response.ok) {
    throw new Error('Failed to fetch market data')
  }

  const data = await response.json()
  return data.data
}

export async function getCryptoDetail(id: string): Promise<CryptoDetail> {
  const response = await fetch(
    `${COINGECKO_API}/coins/${id}?localization=false&vs_currency=inr&tickers=false&market_data=true&community_data=false&developer_data=false&&x_cg_demo_api_key=${process.env.COINGECKO}`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch crypto detail')
  }

  return response.json()
}


