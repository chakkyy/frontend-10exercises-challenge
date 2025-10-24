# Exercise 5 Solution: Internationalization (i18n)

## Implementation Overview

This solution implements **timezone-aware date formatting and locale-aware currency formatting** using the native **Intl API**. The implementation is minimal, robust, and handles edge cases gracefully.

## Architecture

### File Structure

```
exercise5/
├── components/
│   └── TransactionList.tsx   # Demo component
├── lib/
│   └── i18n.ts               # Core i18n utilities
├── __tests__/
│   └── i18n.test.tsx         # Unit tests
├── types.ts                  # TypeScript interfaces
├── page.tsx                  # Exercise page
├── solution.md               # This file
└── README.md                 # Exercise instructions
```

## Key Features

### 1. **Timezone-Aware Date Formatting**

The `formatDate` function ensures dates are always displayed in the correct timezone

```typescript
export const formatDate = (
  date: string | Date,
  timezone: string,
  locale: string = 'en-US'
): string => {
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
  } catch (error) {
    return 'Invalid date'
  }
}
```

**Key Features:**

- Accepts both string and Date objects
- Uses `Intl.DateTimeFormat` with `timeZone` option for accurate conversion
- Validates dates before formatting
- Handles invalid timezones gracefully

**Why `timeZone` option is critical:**

```typescript
const utcDate = '2025-10-24T10:00:00Z' // 10:00 UTC

// ❌ WRONG: Without timezone (uses system timezone)
new Date(utcDate).toLocaleString()
// Result depends on user's device settings

// ✅ CORRECT: With explicit timezone
formatDate(utcDate, 'Europe/Madrid')
// '24 oct 2025, 12:00' (always correct, Madrid is UTC+2)

formatDate(utcDate, 'America/New_York')
// 'Oct 24, 2025, 06:00' (always correct, NY is UTC-4)
```

### 2. **Locale-Aware Currency Formatting**

The `formatCurrency` function formats amounts with proper currency symbols, decimal separators, and digit grouping based on locale.

```typescript
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
  } catch (error) {
    return 'Invalid currency'
  }
}
```

### 3. **Edge Case Handling**

Both functions handle common edge cases:

**Date Edge Cases:**

- Invalid date strings → `"Invalid date"`
- Invalid timezone names → `"Invalid date"`
- Empty strings → `"Invalid date"`
- Date objects with invalid values → `"Invalid date"`

**Currency Edge Cases:**

- Invalid currency codes → `"Invalid currency"`
- Zero amounts → `$0.00`
- Negative amounts → `-$100.50`
- Large numbers → `$1,000,000.99`
- Very small decimals → `$0.01`

## Why Native Intl API?

### ✅ Advantages

1. **No dependencies**: Built into all modern browsers
2. **Automatic DST handling**: No manual calculations needed
3. **Locale-aware**: Respects cultural formatting preferences
4. **Lightweight**: No bundle size increase

### ❌ When to Use Libraries Instead

Consider libraries like `date-fns-tz`, `luxon`, or `day.js` when you need:

- Complex date manipulation (add/subtract months, quarters)
- Relative time ("2 hours ago", "in 3 days")
- Date parsing with custom formats
- Duration calculations
- Advanced timezone manipulation

For this exercise, **native Intl API is perfect** because we only need formatting, not manipulation.

## Alternative Approaches

### Using next-intl (For Full i18n)

```typescript
import { useTranslations, useFormatter } from 'next-intl'

function Component() {
  const format = useFormatter()

  const formattedDate = format.dateTime(new Date(), {
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  const formattedCurrency = format.number(1234.56, {
    style: 'currency',
    currency: 'EUR',
  })
}
```

**When to use next-intl:**

- Full app internationalization (not just formatting)
- Multiple languages with text translations
- SSR with locale-based routing
- Type-safe translation keys

## References

- [MDN: Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)
- [MDN: Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)
- [IANA Time Zone Database](https://www.iana.org/time-zones)
- [ISO 4217 Currency Codes](https://www.iso.org/iso-4217-currency-codes.html)
- [BCP 47 Language Tags](https://www.rfc-editor.org/rfc/bcp/bcp47.txt)
