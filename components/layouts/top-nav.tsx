import Link from 'next/link'
import { Search } from '@/components/search'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { CandlestickChart } from 'lucide-react'

export function TopNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center gap-2 font-bold">
          <CandlestickChart className="h-6 w-6" />
          <Link href="/">Crypto Tracker</Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full md:w-[300px]">
            <Search />
          </div>
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/markets">Markets</Link>
            </Button>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}


