'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import type { Lead, SortConfig, SortField } from '../types'

interface ApiUser {
  id: number
  name: string
  email: string
  phone: string
  website: string
  company: {
    name: string
  }
}

const API_URL = 'https://jsonplaceholder.typicode.com/users'

const transformApiData = (users: ApiUser[]): Lead[] => {
  return users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    company: user.company.name,
    phone: user.phone,
    website: user.website,
  }))
}

export const useLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sortConfig, setSortConfig] = useState<SortConfig>({ field: null, direction: 'asc' })
  const [searchQuery, setSearchQuery] = useState('')

  // Ideally it should be handled with React Query hook
  useEffect(() => {
    const fetchLeads = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(API_URL)

        if (!response.ok) {
          throw new Error(`Failed to fetch leads: ${response.status} ${response.statusText}`)
        }

        const data = (await response.json()) as ApiUser[]
        const transformedLeads = transformApiData(data)
        setLeads(transformedLeads)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch leads'
        setError(errorMessage)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLeads()
  }, [])

  const handleSort = useCallback((field: SortField) => {
    setSortConfig((prevConfig) => {
      if (prevConfig.field === field) {
        return {
          field,
          direction: prevConfig.direction === 'asc' ? 'desc' : 'asc',
        }
      }
      return { field, direction: 'asc' }
    })
  }, [])

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
  }, [])

  const sortedLeads = useMemo(() => {
    if (!sortConfig.field) return leads

    const sorted = [...leads]
    sorted.sort((a, b) => {
      const aValue = a[sortConfig.field!].toLowerCase()
      const bValue = b[sortConfig.field!].toLowerCase()

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1
      return 0
    })

    return sorted
  }, [leads, sortConfig])

  return {
    leads: sortedLeads,
    isLoading,
    error,
    sortConfig,
    searchQuery,
    handleSort,
    handleSearch,
  }
}
