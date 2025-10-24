import { render, screen } from '@testing-library/react'
import { VirtualizedList } from '../components/VirtualizedList'
import { ListItem } from '../types'

const generateItems = (count: number): ListItem[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `item-${i}`,
    name: `Item ${i + 1}`,
    value: Math.random() * 1000,
  }))
}

describe('VirtualizedList', () => {
  it('renders only visible items in the DOM (virtualization)', () => {
    const items = generateItems(50)

    const { container } = render(<VirtualizedList items={items} />)

    const renderedItems = container.querySelectorAll('[style*="position: absolute"]')

    expect(renderedItems.length).toBeLessThan(15)
    expect(renderedItems.length).toBeGreaterThan(0)

    expect(renderedItems.length).toBeLessThan(items.length)
  })

  it('displays the correct badge showing virtualized status', () => {
    const items = generateItems(10)

    render(<VirtualizedList items={items} />)

    expect(screen.getByText(/Virtualized: Only renders visible items/i)).toBeInTheDocument()
  })
})
