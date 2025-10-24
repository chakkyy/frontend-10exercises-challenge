import { Button } from '@/components/ui/button'
import { CartItem } from '../types'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const CartItemCard = ({
  item,
  onRemove,
  onUpdateQuantity,
}: {
  item: CartItem
  onRemove: (id: string) => void
  onUpdateQuantity: (id: string, quantity: number) => void
}) => (
  <Card key={item.id} className={item.unavailable ? 'opacity-60 border-yellow-200' : ''}>
    <CardContent className="p-4">
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <p
                className={`font-medium ${item.unavailable ? 'line-through text-muted-foreground' : ''}`}
              >
                {item.name}
              </p>
              {item.unavailable && (
                <Badge variant="secondary" className="text-xs">
                  Unavailable
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {item.unavailable ? 'Product no longer available' : `$${item.price.toFixed(2)} each`}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(item.id)}
            className="text-destructive hover:text-destructive cursor-pointer"
          >
            Remove
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1 || item.unavailable}
            >
              -
            </Button>
            <span className="w-8 text-center font-medium">{item.quantity}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              disabled={item.unavailable}
            >
              +
            </Button>
          </div>
          <p className="font-semibold">
            {item.unavailable ? (
              <span className="text-muted-foreground">N/A</span>
            ) : (
              `$${(item.price * item.quantity).toFixed(2)}`
            )}
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
)

export default CartItemCard
