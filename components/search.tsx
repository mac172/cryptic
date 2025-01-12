'use client'

import { useState, useEffect } from 'react'
import { SearchIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { CryptoAsset } from '../types/crypto'
import Image from 'next/image'
import Link from 'next/link'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

interface SearchProps {
  cryptos: CryptoAsset[]
}

export function Search({ cryptos }: SearchProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [filteredCryptos, setFilteredCryptos] = useState<CryptoAsset[]>([])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const handleSearch = (value: string) => {
    setQuery(value)
    const filtered = cryptos.filter((crypto) =>
      crypto.name.toLowerCase().includes(value.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredCryptos(filtered)
  }

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="relative w-full cursor-pointer"
      >
        <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search cryptocurrencies... (⌘+K)"
          className="pl-8 bg-card hover:bg-card/80 transition-colors"
          readOnly
        />
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
          placeholder="Search cryptocurrencies..."
          value={query}
          onValueChange={handleSearch}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Cryptocurrencies">
            {filteredCryptos.map((crypto) => (
              <CommandItem
                key={crypto.id}
                value={crypto.name}
                onSelect={() => {
                  setOpen(false)
                  window.location.href = `/coin/${crypto.id}`
                }}
              >
                <div className="flex items-center space-x-2">
                  <Image
                    src={crypto.image}
                    alt={crypto.name}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <span>{crypto.name}</span>
                  <span className="text-muted-foreground">
                    ({crypto.symbol.toUpperCase()})
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

