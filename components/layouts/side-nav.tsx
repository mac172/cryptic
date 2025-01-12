'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { BarChart2, Bookmark, CandlestickChart, Globe, LayoutDashboard, LineChart, TrendingUp } from 'lucide-react'

const sidebarLinks = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Markets',
    href: '/markets',
    icon: CandlestickChart,
  },
  {
    title: 'Trending',
    href: '/trending',
    icon: TrendingUp,
  },
  {
    title: 'Watchlist',
    href: '/watchlist',
    icon: Bookmark,
  },
  {
    title: 'Global Markets',
    href: '/global',
    icon: Globe,
  },
  {
    title: 'Volume',
    href: '/volume',
    icon: BarChart2,
  },
  {
    title: 'Analysis',
    href: '/analysis',
    icon: LineChart,
  },
]

export function SideNav() {
  const pathname = usePathname()

  return (
    <nav className="hidden border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:block">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {sidebarLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === link.href ? "bg-accent" : "transparent"
                )}
              >
                <link.icon className="mr-2 h-4 w-4" />
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}


