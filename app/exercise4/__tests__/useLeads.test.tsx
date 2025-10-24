import { renderHook, waitFor } from '@testing-library/react'
import { act } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useLeads } from '../hooks/useLeads'

const mockLeads = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    website: 'example.com',
    company: { name: 'Acme Corp' },
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '098-765-4321',
    website: 'test.com',
    company: { name: 'Tech Inc' },
  },
]

global.fetch = jest.fn()

describe('useLeads', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockLeads,
    })
  })

  it('fetches and transforms leads on mount', async () => {
    const { result } = renderHook(() => useLeads())

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.leads).toHaveLength(2)
    expect(result.current.leads[0]).toEqual({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      website: 'example.com',
      company: 'Acme Corp',
    })
  })

  it('handles sorting by name', async () => {
    const { result } = renderHook(() => useLeads())

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    act(() => {
      result.current.handleSort('name')
    })

    expect(result.current.sortConfig.field).toBe('name')
    expect(result.current.sortConfig.direction).toBe('asc')
    expect(result.current.leads[0].name).toBe('Jane Smith')
  })

  it('handles search query state', async () => {
    const { result } = renderHook(() => useLeads())

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    act(() => {
      result.current.handleSearch('jane')
    })

    expect(result.current.searchQuery).toBe('jane')
    expect(result.current.leads).toHaveLength(2) // Hook doesn't filter, component does
  })

  it('handles fetch errors', async () => {
    ;(global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'))

    const { result } = renderHook(() => useLeads())

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.error).toBe('Network error')
    expect(result.current.leads).toHaveLength(0)
  })
})
