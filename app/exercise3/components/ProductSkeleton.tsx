import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const ProductSkeleton = () => (
  <Card>
    <CardContent className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
        <Skeleton className="h-9 w-24" />
      </div>
    </CardContent>
  </Card>
)

export default ProductSkeleton
