import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { SortConfig, SortField } from '../types'

const SortableHeader = ({
  field,
  label,
  currentField,
  direction,
  onSort,
}: {
  field: SortField
  label: string
  currentField: SortField | null
  direction: 'asc' | 'desc'
  onSort: (field: SortField) => void
}) => {
  const isActive = currentField === field
  const arrow = isActive ? (direction === 'asc' ? '↑' : '↓') : ''

  return (
    <TableHead
      className="cursor-pointer select-none bg-muted/70 hover:bg-muted transition-colors font-semibold"
      onClick={() => onSort(field)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSort(field)
        }
      }}
      aria-sort={isActive ? (direction === 'asc' ? 'ascending' : 'descending') : 'none'}
    >
      <div className="flex items-center gap-2">
        {label}
        {arrow && <span className="text-primary font-bold">{arrow}</span>}
      </div>
    </TableHead>
  )
}

type LeadsTableWrapperProps = {
  sortConfig: SortConfig
  onSort: (field: SortField) => void
  children: React.ReactNode
}

export const LeadsTableWrapper = ({ sortConfig, onSort, children }: LeadsTableWrapperProps) => {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16 bg-muted/70 font-semibold">ID</TableHead>
            <SortableHeader
              field="name"
              label="Name"
              currentField={sortConfig.field}
              direction={sortConfig.direction}
              onSort={onSort}
            />
            <SortableHeader
              field="email"
              label="Email"
              currentField={sortConfig.field}
              direction={sortConfig.direction}
              onSort={onSort}
            />
            <SortableHeader
              field="company"
              label="Company"
              currentField={sortConfig.field}
              direction={sortConfig.direction}
              onSort={onSort}
            />
            <TableHead className="bg-muted/70 font-semibold">Phone</TableHead>
            <TableHead className="bg-muted/70 font-semibold">Website</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{children}</TableBody>
      </Table>
    </div>
  )
}
