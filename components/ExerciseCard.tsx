'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'

interface ExerciseCardProps {
  number: number
  title: string
  description: string
  technologies: string[]
  href: string
}

export const ExerciseCard = ({
  number,
  title,
  description,
  technologies,
  href,
}: ExerciseCardProps) => {
  const [isNavigating, setIsNavigating] = useState(false)
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setIsNavigating(true)
    router.push(href)
  }

  return (
    <Link href={href} onClick={handleClick} className="block group cursor-pointer relative">
      {isNavigating && (
        <div className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center animate-in fade-in duration-200">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Loading exercise...
            </p>
          </div>
        </div>
      )}
      <Card className="flex flex-col h-full border-zinc-200 dark:border-zinc-800 relative transition-all duration-200 active:scale-[0.98]">
        <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-100 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 rounded-2xl dark:bg-zinc-800/50" />
        <CardHeader className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-zinc-50 text-sm font-semibold dark:bg-zinc-100 dark:text-zinc-900">
              {number}
            </div>
            <CardTitle className="text-base font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
              {title}
            </CardTitle>
          </div>
          <CardDescription className="line-clamp-3 text-sm text-zinc-600 dark:text-zinc-400">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 relative z-10">
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="text-xs bg-zinc-200 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-100 border-0"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="relative z-10">
          <div className="flex items-center text-sm font-medium text-teal-500 dark:text-teal-400">
            View Exercise
            <svg
              className="ml-1 h-4 w-4 stroke-current"
              fill="none"
              viewBox="0 0 16 16"
              aria-hidden="true"
            >
              <path
                d="M6.75 5.75 9.25 8l-2.5 2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
