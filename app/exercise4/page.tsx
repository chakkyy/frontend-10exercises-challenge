import { SimpleLayout } from '@/components/SimpleLayout'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import { LeadsTable } from './components/LeadsTable'
import readmeContent from './README.md'
import solutionContent from './solution.md'

export default function Exercise4Page() {
  return (
    <SimpleLayout
      title="Data Fetching Dashboard"
      intro="Build a dashboard that fetches data from an API, displays it in a responsive table with sorting/filtering, and handles loading and error states gracefully."
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
            Below is a fully functional sales leads dashboard that fetches data from JSONPlaceholder
            API. Try sorting columns and searching to filter results.
          </p>
          <LeadsTable />
        </div>
      </section>

      <section>
        <MarkdownRenderer content={solutionContent} />
      </section>
    </SimpleLayout>
  )
}
