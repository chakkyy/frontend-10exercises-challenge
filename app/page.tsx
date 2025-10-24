import { ExerciseCard } from '@/components/ExerciseCard'

const exercises = [
  {
    number: 1,
    title: 'SCSS & Responsive Navigation',
    description:
      'Style a navigation bar with SCSS using BEM methodology. Display links horizontally on desktop, vertically on mobile. Explain modern approaches to organizing SCSS for large projects.',
    technologies: ['SCSS', 'BEM', 'Responsive Design', 'React'],
    href: '/exercise1',
  },
  {
    number: 2,
    title: 'Accessible Newsletter Form',
    description:
      'Create a semantic and accessible newsletter signup form with HTML5 validation, keyboard-friendly navigation, and proper ARIA labels for screen readers.',
    technologies: ['HTML5', 'Accessibility', 'ARIA', 'React', 'shadcn/ui'],
    href: '/exercise2',
  },
  {
    number: 3,
    title: 'Shopping Cart State Management',
    description:
      'Manage shopping cart state with add/remove functionality, localStorage persistence, and multi-tab synchronization using BroadcastChannel API.',
    technologies: ['TypeScript', 'localStorage', 'BroadcastChannel', 'React Hooks'],
    href: '/exercise3',
  },
  {
    number: 4,
    title: 'Data Fetching Dashboard',
    description:
      'Build a dashboard that fetches data from an API, displays it in a responsive table with sorting/filtering, and handles loading and error states gracefully.',
    technologies: ['API', 'Data Fetching', 'Sorting', 'Filtering', 'Error Handling'],
    href: '/exercise4',
  },
  {
    number: 5,
    title: 'Internationalization (i18n)',
    description:
      'Create functions to format dates with timezones and currencies with locale support using the native Intl API. Handle edge cases like DST transitions.',
    technologies: ['Intl API', 'i18n', 'TypeScript', 'Unit Testing'],
    href: '/exercise5',
  },
  {
    number: 6,
    title: 'Testing Strategy',
    description:
      'Write comprehensive tests for a profile update function using Jest and Playwright. Demonstrate unit tests, E2E tests, and explain when to use each.',
    technologies: ['Jest', 'Playwright', 'Testing Library', 'E2E', 'Unit Tests'],
    href: '/exercise6',
  },
  {
    number: 7,
    title: 'Invoice Form Validation',
    description:
      'Build an invoice form with async validation for unique invoice numbers, date validation, and email format checking. Display errors in real-time.',
    technologies: ['Yup', 'Async Validation', 'Forms', 'React Hooks'],
    href: '/exercise7',
  },
  {
    number: 8,
    title: 'Performance Optimization',
    description:
      'Optimize a list with thousands of items. Compare naive implementation with event delegation and virtualization. Show performance improvements.',
    technologies: ['react-window', 'Performance', 'Virtualization', 'React Profiler'],
    href: '/exercise8',
  },
  {
    number: 9,
    title: 'Role-Based Access Control (RBAC)',
    description:
      'Implement a permission system with roles (admin, editor, viewer). Create functions to check permissions and conditionally render UI elements.',
    technologies: ['RBAC', 'Permissions', 'TypeScript', 'HOC', 'React Hooks'],
    href: '/exercise9',
  },
  {
    number: 10,
    title: 'UX Problem Solving',
    description:
      'Analyze user feedback about an overwhelming dashboard. Propose three UI/UX solutions with tradeoffs, and recommend the best approach with rationale.',
    technologies: ['UX Analysis', 'Problem Solving', 'Design Thinking'],
    href: '/exercise10',
  },
]

export default function Home() {
  return (
    <div className="bg-zinc-50 dark:bg-black">
      <div className="container mx-auto py-12 sm:py-20 px-4 sm:px-8">
        <div className="mb-16 sm:mb-20 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter mb-6 text-zinc-900 dark:text-zinc-100">
            Frontend Challenge
          </h1>
          <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            A comprehensive showcase of 10 frontend engineering exercises demonstrating expertise in
            React, TypeScript, Testing, Performance, and User Experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {exercises.map((exercise) => (
            <ExerciseCard key={exercise.number} {...exercise} />
          ))}
        </div>

        <div className="mt-16 sm:mt-20 p-6 sm:p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-zinc-900 dark:text-zinc-100">
            About This Project
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
            This is a take-home challenge for a Frontend Engineer position. Each exercise
            demonstrates different aspects of modern frontend development, from styling and
            accessibility to performance optimization and user experience design.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            <strong className="text-zinc-900 dark:text-zinc-100">Tech Stack:</strong> Next.js 15,
            React 19, TypeScript, TailwindCSS, shadcn/ui, Jest, Playwright
          </p>
        </div>
      </div>
    </div>
  )
}
