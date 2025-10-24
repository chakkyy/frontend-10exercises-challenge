import { formatDate, formatCurrency } from '../lib/i18n'

describe('formatDate', () => {
  const testDate = '2025-10-24T10:00:00Z' // 10:00 UTC

  it('should format date with UTC timezone', () => {
    const result = formatDate(testDate, 'UTC')
    expect(result).toBe('Oct 24, 2025, 10:00')
  })

  it('should format date with Europe/Madrid timezone (UTC+2)', () => {
    const result = formatDate(testDate, 'Europe/Madrid')
    // Madrid is UTC+2 in October (CEST), so 10:00 UTC = 12:00 Madrid
    expect(result).toContain('12:00')
    expect(result).toContain('24')
  })

  it('should format date with America/New_York timezone (UTC-4)', () => {
    const result = formatDate(testDate, 'America/New_York')
    // New York is UTC-4 in October (EDT), so 10:00 UTC = 06:00 New York
    expect(result).toContain('06:00')
    expect(result).toContain('24')
  })

  it('should format date with Asia/Tokyo timezone (UTC+9)', () => {
    const result = formatDate(testDate, 'Asia/Tokyo')
    // Tokyo is UTC+9, so 10:00 UTC = 19:00 Tokyo
    expect(result).toContain('19:00')
    expect(result).toContain('24')
  })

  it('should format date with custom locale (es-ES)', () => {
    const result = formatDate(testDate, 'UTC', 'es-ES')
    // Spanish locale uses different month abbreviations
    expect(result).toContain('oct')
    expect(result).toContain('2025')
  })

  it('should handle Date object input', () => {
    const dateObj = new Date(testDate)
    const result = formatDate(dateObj, 'UTC')
    expect(result).toBe('Oct 24, 2025, 10:00')
  })

  it('should return "Invalid date" for invalid date string', () => {
    const result = formatDate('not-a-date', 'UTC')
    expect(result).toBe('Invalid date')
  })

  it('should return "Invalid date" for invalid timezone', () => {
    const result = formatDate(testDate, 'Invalid/Timezone')
    expect(result).toBe('Invalid date')
  })

  it('should handle empty string as date', () => {
    const result = formatDate('', 'UTC')
    expect(result).toBe('Invalid date')
  })
})

describe('formatCurrency', () => {
  it('should format USD currency with en-US locale', () => {
    const result = formatCurrency(1234.56, 'USD', 'en-US')
    expect(result).toBe('$1,234.56')
  })

  it('should format EUR currency with en-US locale', () => {
    const result = formatCurrency(1234.56, 'EUR', 'en-US')
    expect(result).toBe('€1,234.56')
  })

  it('should format EUR currency with es-ES locale', () => {
    const result = formatCurrency(1234.56, 'EUR', 'es-ES')
    // Spanish locale uses , for decimals (thousands separator appears only for larger numbers)
    expect(result).toContain('1234,56')
    expect(result).toContain('€')
  })

  it('should format GBP currency', () => {
    const result = formatCurrency(567.89, 'GBP', 'en-GB')
    expect(result).toBe('£567.89')
  })

  it('should format JPY currency (no decimal places)', () => {
    const result = formatCurrency(50000, 'JPY', 'ja-JP')
    // Japanese Yen has no decimal places
    expect(result).toContain('50,000')
    // Japanese locale uses fullwidth yen symbol ￥
    expect(result).toMatch(/[¥￥]/)
  })

  it('should handle zero amount', () => {
    const result = formatCurrency(0, 'USD', 'en-US')
    expect(result).toBe('$0.00')
  })

  it('should handle negative amount', () => {
    const result = formatCurrency(-100.5, 'USD', 'en-US')
    expect(result).toBe('-$100.50')
  })

  it('should handle large numbers', () => {
    const result = formatCurrency(1000000.99, 'USD', 'en-US')
    expect(result).toBe('$1,000,000.99')
  })

  it('should handle very small decimal amounts', () => {
    const result = formatCurrency(0.01, 'USD', 'en-US')
    expect(result).toBe('$0.01')
  })

  it('should return "Invalid currency" for invalid currency code', () => {
    const result = formatCurrency(100, 'INVALID')
    expect(result).toBe('Invalid currency')
  })

  it('should use default locale when not specified', () => {
    const result = formatCurrency(100, 'USD')
    expect(result).toBe('$100.00')
  })
})
