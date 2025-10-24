'use client'

import { useMemo } from 'react'
import { SimpleLayout } from '@/components/SimpleLayout'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import { NaiveList } from './components/NaiveList'
import { OptimizedList } from './components/OptimizedList'
import { VirtualizedList } from './components/VirtualizedList'
import { ListItem } from './types'
import readmeContent from './README.md'
import solutionContent from './solution.md'

const generateItems = (count: number): ListItem[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `item-${i}`,
    name: `Item ${i + 1}`,
    value: 200 + i,
  }))
}

export default function Exercise8Page() {
  const items = useMemo(() => generateItems(50), [])

  return (
    <SimpleLayout
      title="Performance Optimization"
      intro="Optimize a list with thousands of items. Compare naive implementation with event delegation and virtualization. Show performance improvements."
    >
      <section className="mb-16">
        <MarkdownRenderer content={readmeContent} />
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-zinc-900 dark:text-zinc-100">
          Interactive Demo
        </h2>
        <h3 className="text-lg text-zinc-600 dark:text-zinc-400 mb-4">
          ⚙️ Open DevTools to see more information on console logs
        </h3>
        <div className="space-y-8">
          <div className="border border-zinc-200 rounded-2xl p-6 bg-white dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="text-lg font-semibold mb-4 text-zinc-900 dark:text-zinc-100">
              ❌ Naive Approach
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              Each item has its own click handler. With {items.length} items = {items.length} event
              listeners attached to the DOM.
            </p>
            <NaiveList items={items} />
          </div>

          <div className="border border-zinc-200 rounded-2xl p-6 bg-white dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="text-lg font-semibold mb-4 text-zinc-900 dark:text-zinc-100">
              ✅ Event Delegation
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              One event listener on the parent. All {items.length} items still rendered in the DOM,
              but only 1 event listener.
            </p>
            <OptimizedList items={items} />
          </div>

          <div className="border border-zinc-200 rounded-2xl p-6 bg-white dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="text-lg font-semibold mb-4 text-zinc-900 dark:text-zinc-100">
              🚀 Virtualization (Best)
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              Only renders visible items. With {items.length} items, only ~7-10 DOM nodes rendered
              at any time. Open DevTools to inspect!
            </p>
            <VirtualizedList items={items} />
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-zinc-900 dark:text-zinc-100">Solution</h2>
        <div className="border border-zinc-200 rounded-2xl p-6 bg-white dark:border-zinc-800 dark:bg-zinc-900">
          <MarkdownRenderer content={solutionContent} />
        </div>
      </section>
    </SimpleLayout>
  )
}
