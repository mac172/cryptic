export function formatNumber(num: number, maximumFractionDigits: number = 2): string {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits,
  }).format(num)
}

export function formatCurrency(num: number, maximumFractionDigits: number = 2): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits,
  }).format(num)
}

export function formatPercentage(num: number): string {
  return `${num > 0 ? '+' : ''}${num.toFixed(2)}%`
}

export function formatCompactNumber(num: number): string {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(num)
}

export function formatDate(timestamp: number, days: number | string): string {
  const date = new Date(timestamp)
  if (days === 1) {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }
  if (days === 7) {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      hour: '2-digit',
    })
  }
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}


