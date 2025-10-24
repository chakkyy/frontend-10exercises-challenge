export interface Transaction {
  id: string
  date: string
  amount: number
  currency: string
  description: string
}

export const SAMPLE_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    date: '2025-10-24T10:30:00Z',
    amount: 1234.56,
    currency: 'USD',
    description: 'Payment from Acme Corp',
  },
  {
    id: '2',
    date: '2025-10-23T14:15:00Z',
    amount: 890.0,
    currency: 'EUR',
    description: 'Subscription renewal',
  },
  {
    id: '3',
    date: '2025-10-22T08:00:00Z',
    amount: 50000,
    currency: 'JPY',
    description: 'Client invoice payment',
  },
  {
    id: '4',
    date: '2025-10-21T16:45:00Z',
    amount: 567.89,
    currency: 'GBP',
    description: 'Refund to customer',
  },
  {
    id: '5',
    date: '2025-10-20T11:20:00Z',
    amount: 2500.0,
    currency: 'USD',
    description: 'Monthly service fee',
  },
]

export const TIMEZONES = [
  { value: 'UTC', label: 'UTC (+0)' },
  { value: 'America/New_York', label: 'New York (UTC-4/-5)' },
  { value: 'Europe/Madrid', label: 'Madrid (UTC+1/+2)' },
  { value: 'Asia/Tokyo', label: 'Tokyo (UTC+9)' },
  { value: 'Australia/Sydney', label: 'Sydney (UTC+10/+11)' },
]
