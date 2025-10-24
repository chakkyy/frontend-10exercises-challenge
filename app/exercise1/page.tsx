import { SimpleLayout } from '@/components/SimpleLayout'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import { Navbar } from './components/Navbar'
import readmeContent from './README.md'
import solutionContent from './solution.md'
import { Suspense } from 'react'

export default function Exercise1Page() {
  return (
    <SimpleLayout
      title="SCSS & Responsive Navigation"
      intro="Style a navigation bar with SCSS using BEM methodology. Display links horizontally on desktop, vertically on mobile. Explain modern approaches to organizing SCSS for large projects."
    >
      <section className="mb-16">
        <MarkdownRenderer content={readmeContent} />
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-zinc-900 dark:text-zinc-100">
          Interactive Solution
        </h2>
        <div className="border border-zinc-200 rounded-2xl p-6 bg-white dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            Below is a live, interactive navbar component built with SCSS modules and BEM
            methodology. Try clicking the links to see the active state change.
          </p>
          <div className="border border-zinc-200 rounded-xl overflow-hidden dark:border-zinc-800">
            {/* Added Suspense to avoid build errors because navbar using of searchParams hook which is
            not available in server components. */}
            <Suspense fallback={<div className="h-16" />}>
              <Navbar />
            </Suspense>
          </div>
          <div className="mt-4 p-4 bg-zinc-50 rounded-xl dark:bg-zinc-800/50">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              <strong className="text-zinc-900 dark:text-zinc-100">Try this:</strong> Resize your
              browser window below 600px to see the navbar switch from horizontal to vertical
              layout. The component is fully responsive!
            </p>
          </div>
        </div>
      </section>

      <section>
        <MarkdownRenderer content={solutionContent} />
      </section>
    </SimpleLayout>
  )
}
