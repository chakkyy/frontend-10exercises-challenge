import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { Analytics } from '@vercel/analytics/next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Frontend Challenge - Carlos Ramirez',
  description: 'Frontend Engineer Challenge showcasing 10 comprehensive exercises',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        {/* turn on to see performance metrics in the browser */}
        {/* <script crossOrigin="anonymous" src="//unpkg.com/react-scan/dist/auto.global.js" /> */}
      </head>
      <body className={`${inter.className} flex h-full bg-zinc-50 dark:bg-black`}>
        <div className="flex w-full min-h-screen flex-col">
          <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/95 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/95">
            <div className="container mx-auto flex h-14 items-center px-4 sm:px-8">
              <Link
                href="/"
                className="flex items-center space-x-2 font-bold text-zinc-900 hover:text-zinc-600 transition-colors dark:text-zinc-100 dark:hover:text-zinc-400"
              >
                Home 🏠
              </Link>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t border-zinc-200 py-6 md:py-0 dark:border-zinc-800">
            <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 sm:px-8">
              <p className="text-center text-sm leading-loose text-zinc-600 md:text-left dark:text-zinc-400">
                Built by{' '}
                <Link
                  href="https://cramirez.is-a.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-500 transition-colors dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Carlos Ramirez
                </Link>{' '}
                for Frontend Engineer Challenge
              </p>
            </div>
          </footer>
        </div>
        <Analytics />
      </body>
    </html>
  )
}
