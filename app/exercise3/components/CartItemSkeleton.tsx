import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const CartItemSkeleton = () => (
  <Card>
    <CardContent className="p-4">
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-4 w-1/3" />
          </div>
          <Skeleton className="h-9 w-20" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-9" />
            <Skeleton className="h-5 w-8" />
            <Skeleton className="h-9 w-9" />
          </div>
          <Skeleton className="h-6 w-16" />
        </div>
      </div>
    </CardContent>
  </Card>
)

export default CartItemSkeleton
