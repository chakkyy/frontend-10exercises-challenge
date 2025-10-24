'use client'

import { useCallback } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCart } from '../hooks/useCart'
import { useCartSync } from '../hooks/useCartSync'
import type { Product, Cart } from '../types'
import ProductCard from './ProductCard'
import CartItemCard from './CartItemCard'
import ProductSkeleton from './ProductSkeleton'
import CartItemSkeleton from './CartItemSkeleton'

const SAMPLE_PRODUCTS: Product[] = [
  { id: '1', name: 'Wireless Headphones', price: 79.99 },
  { id: '2', name: 'Smart Watch', price: 299.99 },
  { id: '3', name: 'Laptop Stand', price: 49.99 },
  { id: '4', name: 'Mechanical Keyboard', price: 129.99 },
  { id: '5', name: 'USB-C Hub', price: 39.99 },
]

export const ShoppingCart = () => {
  const {
    cart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    syncCart,
    getItemCount,
    error,
    isLoading,
  } = useCart()

  const handleCartUpdate = useCallback(
    (updatedCart: Cart) => {
      syncCart(updatedCart)
    },
    [syncCart]
  )

  useCartSync(cart, handleCartUpdate)

  return (
    <article className="w-full max-w-6xl mx-auto bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Shopping Cart Demo</h1>
          <p className="text-sm text-muted-foreground">
            Items in cart: {isLoading ? '...' : getItemCount()} | Total: $
            {isLoading ? '0.00' : cart.total.toFixed(2)}
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <Badge variant="default">🔄 Multi-tab Sync Enabled</Badge>
          {!isLoading && cart.items.length > 0 && (
            <Button variant="outline" size="sm" onClick={clearCart}>
              Clear Cart
            </Button>
          )}
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

      <div className="grid md:grid-cols-2 gap-6">
        <section>
          <h2 className="text-lg font-semibold mb-4">Available Products</h2>
          <div className="space-y-3">
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => <ProductSkeleton key={index} />)
              : SAMPLE_PRODUCTS.map((product) => (
                  <ProductCard key={product.id} product={product} onAdd={addItem} />
                ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4">Your Cart</h2>
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <CartItemSkeleton key={index} />
              ))}
            </div>
          ) : cart.items.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">Your cart is empty</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Add some products to get started!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {cart.items.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onRemove={removeItem}
                  onUpdateQuantity={updateQuantity}
                />
              ))}

              <Card className="bg-primary/5">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-lg">Total:</p>
                    <p className="font-bold text-2xl">${cart.total.toFixed(2)}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </section>
      </div>

      <footer className="mt-6 p-4 bg-muted rounded-md">
        <p className="text-sm font-medium mb-2">💡 Try this:</p>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Add items to the cart and refresh the page</li>
          <li>• Open this page in multiple tabs and watch the cart sync automatically</li>
          <li>• The cart is stored in localStorage and synced via BroadcastChannel API</li>
        </ul>
      </footer>
    </article>
  )
}
