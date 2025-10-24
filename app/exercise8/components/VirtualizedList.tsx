'use client'

import { useState } from 'react'
import { FixedSizeList as List } from 'react-window'
import { ListItem } from '../types'
import { Badge } from '@/components/ui/badge'

interface VirtualizedListProps {
  items: ListItem[]
}

export const VirtualizedList = ({ items }: VirtualizedListProps) => {
  const [selected, setSelected] = useState<string | null>(null)

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement
    const itemDiv = target.closest('[data-item-id]') as HTMLElement

    if (itemDiv) {
      const itemId = itemDiv.dataset.itemId
      if (itemId) {
        setSelected(itemId)
      }
    }
  }

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const item = items[index]
    const isSelected = selected === item.id

    return (
      <div
        style={style}
        data-item-id={item.id}
        className={`flex items-center justify-between px-4 cursor-pointer border-b border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 ${isSelected ? 'bg-purple-50 dark:bg-purple-900/20' : ''}`}
      >
        <span className="font-medium text-zinc-900 dark:text-zinc-100">{item.name}</span>
        <span className="text-sm text-zinc-500">${item.value.toFixed(2)}</span>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div>
        <Badge variant="default" className="bg-purple-600">
          Virtualized: Only renders visible items
        </Badge>
      </div>

      <div
        onClick={handleClick}
        className="border border-zinc-200 rounded-lg dark:border-zinc-800 overflow-hidden"
      >
        <List height={400} itemCount={items.length} itemSize={65} width="100%">
          {Row}
        </List>
      </div>

      {selected && (
        <div className="p-4 bg-purple-50 rounded-lg dark:bg-purple-900/20">
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            Selected: <strong>{items.find((i) => i.id === selected)?.name}</strong>
          </p>
        </div>
      )}
    </div>
  )
}
