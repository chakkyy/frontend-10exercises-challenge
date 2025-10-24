'use client'

import { useState } from 'react'
import { ListItem } from '../types'
import { Badge } from '@/components/ui/badge'

interface OptimizedListProps {
  items: ListItem[]
}

export const OptimizedList = ({ items }: OptimizedListProps) => {
  const [selected, setSelected] = useState<string | null>(null)

  const handleClick = (e: React.MouseEvent<HTMLUListElement>) => {
    const target = e.target as HTMLElement
    const listItem = target.closest('li')

    if (listItem) {
      const itemId = listItem.dataset.id
      if (itemId) {
        setSelected(itemId)
      }
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <Badge variant="default" className="bg-green-600">
          Optimized: 1 event listener
        </Badge>
      </div>

      <div className="border border-zinc-200 rounded-lg dark:border-zinc-800 h-[400px] overflow-auto">
        <ul onClick={handleClick} className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {items.map((item) => (
            <li
              key={item.id}
              data-id={item.id}
              className={`
                p-4 cursor-pointer transition-colors
                hover:bg-zinc-50 dark:hover:bg-zinc-800/50
                ${selected === item.id ? 'bg-green-50 dark:bg-green-900/20' : ''}
              `}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-zinc-900 dark:text-zinc-100">{item.name}</span>
                <span className="text-sm text-zinc-500">${item.value.toFixed(2)}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {selected && (
        <div className="p-4 bg-green-50 rounded-lg dark:bg-green-900/20">
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            Selected: <strong>{items.find((i) => i.id === selected)?.name}</strong>
          </p>
        </div>
      )}
    </div>
  )
}
