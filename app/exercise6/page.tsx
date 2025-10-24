import { SimpleLayout } from '@/components/SimpleLayout'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import { ProfileUpdateDemo } from './components/ProfileUpdateDemo'
import readmeContent from './README.md'
import solutionContent from './solution.md'

export default function Exercise6Page() {
  return (
    <SimpleLayout
      title="Testing Strategy"
      intro="Write comprehensive tests for a profile update function using Jest and Playwright. Demonstrate unit tests, E2E tests, and explain when to use each."
    >
      <section className="mb-16">
        <MarkdownRenderer content={readmeContent} />
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-zinc-900 dark:text-zinc-100">
          Interactive Demo
        </h2>
        <ProfileUpdateDemo />
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
