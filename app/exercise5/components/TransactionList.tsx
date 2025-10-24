'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { formatDate, formatCurrency } from '../lib/i18n'
import { SAMPLE_TRANSACTIONS, TIMEZONES } from '../types'

export const TransactionList = () => {
  const [selectedTimezone, setSelectedTimezone] = useState('UTC')

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="timezone-select">Select Timezone</Label>
        <select
          id="timezone-select"
          value={selectedTimezone}
          onChange={(e) => setSelectedTimezone(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-zinc-300 bg-white text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {TIMEZONES.map((tz) => (
            <option key={tz.value} value={tz.value}>
              {tz.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-3">
        {SAMPLE_TRANSACTIONS.map((transaction) => (
          <Card key={transaction.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <p className="font-medium text-zinc-900 dark:text-zinc-100">
                  {transaction.description}
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  {formatDate(transaction.date, selectedTimezone)}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-lg text-zinc-900 dark:text-zinc-100">
                  {formatCurrency(transaction.amount, transaction.currency)}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  {transaction.currency}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900">
        <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">How it works</h3>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>
            • <strong>Dates</strong> are displayed in the selected timezone using{' '}
            <code className="px-1 py-0.5 bg-blue-100 dark:bg-blue-900 rounded">
              Intl.DateTimeFormat
            </code>
          </li>
          <li>
            • <strong>Currencies</strong> are formatted with proper symbols and locale using{' '}
            <code className="px-1 py-0.5 bg-blue-100 dark:bg-blue-900 rounded">
              Intl.NumberFormat
            </code>
          </li>
          <li>
            • All transactions use the same UTC timestamps but display differently per timezone
          </li>
        </ul>
      </div>
    </div>
  )
}
