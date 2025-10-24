import { SimpleLayout } from '@/components/SimpleLayout'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import readmeContent from './README.md'
import solutionContent from './solution.md'
import { RBACDemo } from './components/RBACDemo'

export default function Exercise9Page() {
  return (
    <SimpleLayout
      title="Role-Based Access Control (RBAC)"
      intro="Implement a permission system with roles (admin, editor, viewer). Create functions to check permissions and conditionally render UI elements."
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
            Comprehensive Role based access conrtol system with role management, permission checks,
            and conditional UI rendering.
          </p>
          <RBACDemo />
        </div>
      </section>

      <section>
        <MarkdownRenderer content={solutionContent} />
      </section>
    </SimpleLayout>
  )
}
