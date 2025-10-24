import { TableRow, TableCell } from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'

const LeadsSkeleton = () => (
  <>
    {Array.from({ length: 5 }).map((_, index) => (
      <TableRow key={index}>
        <TableCell>
          <Skeleton className="h-5 w-8" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-5 w-32" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-5 w-40" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-5 w-36" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-5 w-28" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-5 w-32" />
        </TableCell>
      </TableRow>
    ))}
  </>
)

export default LeadsSkeleton
