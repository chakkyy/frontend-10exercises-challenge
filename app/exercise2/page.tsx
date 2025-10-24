import { SimpleLayout } from '@/components/SimpleLayout'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import { NewsletterForm } from './components/NewsletterForm'
import readmeContent from './README.md'
import solutionContent from './solution.md'

export default function Exercise2Page() {
  return (
    <SimpleLayout
      title="Accessible Newsletter Form"
      intro="Create a semantic and accessible newsletter signup form with HTML5 validation, keyboard-friendly navigation, and proper ARIA labels for screen readers."
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
            Below is a fully accessible newsletter form with semantic HTML, HTML5 validation, and
            complete keyboard support. Try navigating with just your keyboard (Tab, Enter) and
            notice the focus indicators.
          </p>
          <NewsletterForm />
          <div className="mt-6 p-4 bg-zinc-50 rounded-xl dark:bg-zinc-800/50">
            <p className="text-sm font-medium mb-2 text-zinc-900 dark:text-zinc-100">
              Accessibility Features:
            </p>
            <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
              <li>✓ Semantic HTML with proper labels</li>
              <li>✓ ARIA attributes for screen readers</li>
              <li>✓ HTML5 email validation</li>
              <li>✓ Full keyboard navigation</li>
              <li>✓ Clear focus indicators</li>
              <li>✓ Status announcements for assistive technologies</li>
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
