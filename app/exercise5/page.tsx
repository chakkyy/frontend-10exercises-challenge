import { SimpleLayout } from '@/components/SimpleLayout'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import readmeContent from './README.md'
import solutionContent from './solution.md'
import { TransactionList } from './components/TransactionList'

export default function Exercise5Page() {
  return (
    <SimpleLayout
      title="Internationalization (i18n)"
      intro="Create functions to format dates with timezones and currencies with locale support using the native Intl API. Handle edge cases like DST transitions."
    >
      <section className="mb-16">
        <MarkdownRenderer content={readmeContent} />
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-zinc-900 dark:text-zinc-100">
          Interactive Solution
        </h2>
        <div className="border border-zinc-200 rounded-2xl p-6 bg-white dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            Comprehensive internationalization utilities using the native Intl API for dates,
            currencies, and timezones.
          </p>
          <TransactionList />
        </div>
      </section>

      <section>
        <MarkdownRenderer content={solutionContent} />
      </section>
    </SimpleLayout>
  )
}
