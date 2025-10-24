import { Card, CardContent } from '@/components/ui/card'
import { Product } from '../types'
import { Button } from '@/components/ui/button'

const ProductCard = ({
  product,
  onAdd,
}: {
  product: Product
  onAdd: (product: Product) => void
}) => (
  <Card key={product.id}>
    <CardContent className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">{product.name}</p>
          <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
        </div>
        <Button
          className="cursor-pointer"
          variant="outline"
          size="sm"
          onClick={() => onAdd(product)}
        >
          Add to Cart
        </Button>
      </div>
    </CardContent>
  </Card>
)

export default ProductCard
