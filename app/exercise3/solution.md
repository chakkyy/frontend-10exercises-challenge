# Exercise 3 Solution: Shopping Cart State Management

## Implementation Overview

This solution implements a **robust shopping cart** with:

- ✅ Add/remove products with quantity management
- ✅ localStorage persistence (survives page reloads)
- ✅ Multi-tab synchronization (BroadcastChannel API)
- ✅ Error handling for edge cases
- ✅ TypeScript type safety
- ✅ Product reconstruction from stored IDs

## Architecture

### File Structure

```
exercise3/
├── components/
│   ├── ShoppingCart.tsx      # Main cart component
│   ├── CartItemCard.tsx      # Individual cart item
│   ├── CartItemSkeleton.tsx  # Loading skeleton for cart
│   ├── ProductCard.tsx       # Product display card
│   └── ProductSkeleton.tsx   # Loading skeleton for products
├── hooks/
│   ├── useCart.ts            # Cart state management
│   └── useCartSync.ts        # Multi-tab synchronization
├── __tests__/
│   └── useCart.test.tsx      # Unit tests
├── types.ts                  # TypeScript interfaces
├── page.tsx                  # Exercise page
├── solution.md               # This file
└── README.md                 # Exercise instructions
```

## State Management Approach

**Decision**: localStorage + BroadcastChannel is optimal for this e-commerce demo because:

1. Simple API, easy to implement
2. Synchronous read/write (fast)
3. Native browser support
4. No dependencies
5. Perfect for small amount of data

## Implementation Details

### 1. TypeScript Types

```typescript
export interface Product {
  id: string
  name: string
  price: number
  image?: string
}

export interface CartItem extends Product {
  quantity: number
  unavailable?: boolean
}

export interface Cart {
  items: CartItem[]
  total: number
}
```

**Key Features:**

- `Product`: Base product information
- `CartItem`: Extends Product with quantity and availability
- `Cart`: Container with calculated total

### 2. useCart Hook

**Key Features:**

```typescript
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
```

**Storage Strategy:**

- Stores only product IDs and quantities to minimize localStorage usage
- Reconstructs full product data on load via `getProductsByIds`
- Handles unavailable products gracefully

**Edge Cases Handled:**

1. **Corrupted Data**: Try-catch around `JSON.parse`, clear on error
2. **Storage Quota**: Check size before saving, handle `QuotaExceededError`
3. **Missing Data**: Return empty cart if nothing in storage
4. **Invalid Structure**: Validate cart structure after parsing
5. **Unavailable Products**: Mark as unavailable but keep in cart

### 3. useCartSync Hook

**BroadcastChannel API:**

```typescript
const channel = new BroadcastChannel('cart-sync-channel')

// Send updates to other tabs
channel.postMessage({
  type: 'CART_UPDATED',
  cart,
  timestamp: Date.now(),
})

// Receive updates from other tabs
channel.onmessage = (event) => {
  if (event.data.timestamp > lastUpdateRef.current) {
    onCartUpdate(event.data.cart)
  }
}
```

**Why timestamps?**

- Prevent circular updates (tab A → tab B → tab A)
- Ensure latest state wins
- Avoid race conditions

## References

- [MDN: Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
- [MDN: BroadcastChannel API](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API)
