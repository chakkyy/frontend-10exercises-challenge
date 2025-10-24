import { SimpleLayout } from '@/components/SimpleLayout'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import { InvoiceForm } from './components/InvoiceForm'
import readmeContent from './README.md'
import solutionContent from './solution.md'

export default function Exercise7Page() {
  return (
    <SimpleLayout
      title="Invoice Form Validation"
      intro="Build an invoice form with async validation for unique invoice numbers, date validation, and email format checking. Display errors in real-time."
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
            Below is an invoice form with async validation for unique invoice numbers, date
            validation preventing future dates, and email format checking. Try submitting with
            invalid data to see real-time error feedback.
          </p>
          <InvoiceForm />
          <div className="mt-6 p-4 bg-zinc-50 rounded-xl dark:bg-zinc-800/50">
            <p className="text-sm font-medium mb-2 text-zinc-900 dark:text-zinc-100">
              Key Features:
            </p>
            <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
              <li>✓ Async validation for invoice number uniqueness</li>
              <li>✓ Date validation preventing future dates</li>
              <li>✓ Email format validation</li>
              <li>✓ Real-time error clearing on user input</li>
              <li>✓ Loading state during async validation</li>
              <li>✓ Full keyboard navigation and accessibility</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <MarkdownRenderer content={solutionContent} />
      </section>
    </SimpleLayout>
  )
}
