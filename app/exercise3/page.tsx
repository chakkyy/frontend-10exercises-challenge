import { SimpleLayout } from '@/components/SimpleLayout'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import { ShoppingCart } from './components/ShoppingCart'
import readmeContent from './README.md'
import solutionContent from './solution.md'

export default function Exercise3Page() {
  return (
    <SimpleLayout
      title="Shopping Cart State Management"
      intro="Manage shopping cart state with add/remove functionality, localStorage persistence, and multi-tab synchronization using BroadcastChannel API."
    >
      <section className="mb-16">
        <MarkdownRenderer content={readmeContent} />
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-zinc-900 dark:text-zinc-100">
          Interactive Solution
        </h2>
        <div className="border border-zinc-200 rounded-2xl p-6 bg-white dark:border-zinc-800 dark:bg-zinc-900">
          <ShoppingCart />
        </div>
      </section>

      <section>
        <MarkdownRenderer content={solutionContent} />
      </section>
    </SimpleLayout>
  )
}
