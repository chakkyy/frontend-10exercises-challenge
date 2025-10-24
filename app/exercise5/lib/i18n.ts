export const formatDate = (
  date: string | Date,
  timezone: string,
  locale: string = 'en-US'
): string | undefined => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date

    if (isNaN(dateObj.getTime())) {
      return 'Invalid date'
    }

    return new Intl.DateTimeFormat(locale, {
      timeZone: timezone,
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(dateObj)
  } catch {
    // PROD NOTES: Here we should add proper error monitoring and logging
    return 'Invalid date'
  }
}

export const formatCurrency = (
  amount: number,
  currency: string,
  locale: string = 'en-US'
): string => {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(amount)
  } catch {
    // PROD NOTES: Here we should add proper error monitoring and logging
    return 'Invalid currency'
  }
}
