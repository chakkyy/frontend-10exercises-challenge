'use client'

import { useState, useEffect, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { TableCell, TableRow } from '@/components/ui/table'
import { useLeads } from '../hooks/useLeads'
import LeadsSkeleton from './LeadsSkeleton'
import { LeadsTablePagination } from './LeadsTablePagination'
import { LeadsTableWrapper } from './LeadsTableWrapper'

export const LeadsTable = () => {
  const { leads, isLoading, error, sortConfig, searchQuery, handleSort, handleSearch } = useLeads()
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])

  const filteredLeads = useMemo(() => {
    if (!debouncedSearchQuery.trim()) return leads

    const query = debouncedSearchQuery.toLowerCase()
    return leads.filter(
      (lead) =>
        lead.name.toLowerCase().includes(query) ||
        lead.email.toLowerCase().includes(query) ||
        lead.company.toLowerCase().includes(query)
    )
  }, [leads, debouncedSearchQuery])

  return (
    <article className="w-full max-w-6xl mx-auto bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <header className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">Sales Leads Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              {isLoading
                ? 'Loading...'
                : `${filteredLeads.length} lead${filteredLeads.length !== 1 ? 's' : ''} found${debouncedSearchQuery ? ` matching "${debouncedSearchQuery}"` : ''}`}
            </p>
          </div>
          <Badge variant="default">📊 Live Data</Badge>
        </div>

        <div className="max-w-md">
          <Input
            type="search"
            placeholder="Search by name, email, or company..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full"
            disabled={isLoading}
            aria-label="Search leads"
          />
        </div>
      </header>

      {error && (
        <div
          className="mb-4 p-4 bg-destructive/10 border border-destructive rounded-md"
          role="alert"
        >
          <p className="text-sm text-destructive font-medium">⚠️ {error}</p>
        </div>
      )}

      {isLoading ? (
        <LeadsTableWrapper sortConfig={sortConfig} onSort={handleSort}>
          <LeadsSkeleton />
        </LeadsTableWrapper>
      ) : (
        <LeadsTablePagination filteredLeads={filteredLeads}>
          {(paginatedLeads) => (
            <LeadsTableWrapper sortConfig={sortConfig} onSort={handleSort}>
              {paginatedLeads.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    {debouncedSearchQuery
                      ? 'No leads found matching your search.'
                      : 'No leads available.'}
                  </TableCell>
                </TableRow>
              ) : (
                paginatedLeads.map((lead) => (
                  <TableRow key={lead.id} className="h-14 hover:bg-accent/50 transition-colors">
                    <TableCell className="font-medium">{lead.id}</TableCell>
                    <TableCell className="font-medium">{lead.name}</TableCell>
                    <TableCell className="text-muted-foreground">{lead.email}</TableCell>
                    <TableCell>{lead.company}</TableCell>
                    <TableCell className="text-muted-foreground">{lead.phone}</TableCell>
                    <TableCell className="text-muted-foreground">{lead.website}</TableCell>
                  </TableRow>
                ))
              )}
            </LeadsTableWrapper>
          )}
        </LeadsTablePagination>
      )}

      <footer className="mt-6 p-4 bg-muted rounded-md">
        <p className="text-sm font-medium mb-2">💡 Try this:</p>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Click column headers (Name, Email, Company) to sort</li>
          <li>• Click again to reverse sort direction</li>
          <li>• Use the search box to filter leads (debounced by 300ms)</li>
          <li>• Navigate through pages using pagination controls</li>
          <li>• Data is fetched from JSONPlaceholder API</li>
        </ul>
      </footer>
    </article>
  )
}
