import { SimpleLayout } from '@/components/SimpleLayout'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import readmeContent from './README.md'
import solutionContent from './solution.md'

export default function Exercise10Page() {
  return (
    <SimpleLayout
      title="UX Problem Solving"
      intro="Analyze user feedback about an overwhelming dashboard. Propose three UI/UX solutions with tradeoffs, and recommend the best approach with rationale."
    >
      <section className="mb-16">
        <MarkdownRenderer content={readmeContent} />
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-zinc-900 dark:text-zinc-100">Solution</h2>
        <MarkdownRenderer content={solutionContent} />
      </section>
    </SimpleLayout>
  )
}
