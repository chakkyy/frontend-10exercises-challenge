'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Cart, CartItem, Product } from '../types'

const CART_STORAGE_KEY = 'shopping-cart'
const MAX_STORAGE_SIZE = 5 * 1024 * 1024 // 5MB limit (max per domain)

interface StoredCartItem {
  id: string
  quantity: number
}

interface StoredCart {
  items: StoredCartItem[]
  timestamp: number
}

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0)
}

const SAMPLE_PRODUCTS: Product[] = [
  { id: '1', name: 'Wireless Headphones', price: 79.99 },
  { id: '2', name: 'Smart Watch', price: 299.99 },
  { id: '3', name: 'Laptop Stand', price: 49.99 },
  { id: '4', name: 'Mechanical Keyboard', price: 129.99 },
  { id: '5', name: 'USB-C Hub', price: 39.99 },
]

const getProductsByIds = async (ids: string[]): Promise<Product[]> => {
  await new Promise((resolve) => setTimeout(resolve, 50))

  // This would be a POST /api/products/batch with { ids: [...] }
  return SAMPLE_PRODUCTS.filter((p) => ids.includes(p.id))
}

const reconstructCartFromStored = async (storedCart: StoredCart): Promise<Cart> => {
  const productIds = storedCart.items.map((item) => item.id)

  let products: Product[] = []
  try {
    products = await getProductsByIds(productIds)
  } catch (error) {
    console.error('Failed to fetch product details:', error)
    // Here we should monitor the error, retry the request, then show a toast to the user in case of failure
  }

  const productMap = new Map(products.map((p) => [p.id, p]))

  // Reconstruct cart items, mark unavailable if product is not found to avoid losing data
  const cartItems: CartItem[] = storedCart.items.map((storedItem) => {
    const product = productMap.get(storedItem.id)
    if (product) {
      return {
        ...product,
        quantity: storedItem.quantity,
      }
    } else {
      return {
        id: storedItem.id,
        name: `Product ${storedItem.id} (Unavailable)`,
        price: 0,
        quantity: storedItem.quantity,
        unavailable: true,
      }
    }
  })

  const availableItems = cartItems.filter((item) => !item.unavailable)

  return {
    items: cartItems,
    total: calculateTotal(availableItems),
  }
}

const loadCartFromStorage = async (): Promise<Cart> => {
  if (typeof window === 'undefined') {
    return { items: [], total: 0 }
  }

  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    if (!stored) {
      return { items: [], total: 0 }
    }

    const parsed = JSON.parse(stored) as StoredCart

    if (!Array.isArray(parsed.items)) {
      throw new Error('Invalid cart structure')
    }

    return await reconstructCartFromStored(parsed)
  } catch (error) {
    console.error('Failed to load cart from storage:', error)
    localStorage.removeItem(CART_STORAGE_KEY)
    return { items: [], total: 0 }
  }
}

const saveCartToStorage = (cart: Cart): { success: boolean; error?: string } => {
  if (typeof window === 'undefined') {
    return { success: false, error: 'Server-side rendering' }
  }

  // Store just id and quantity to avoid exceeding localStorage limit
  const storedCart: StoredCart = {
    items: cart.items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
    })),
    timestamp: Date.now(),
  }

  try {
    const serialized = JSON.stringify(storedCart)

    if (serialized.length > MAX_STORAGE_SIZE) {
      return {
        success: false,
        error: 'Cart is too large to save. Consider reducing items.',
      }
    }

    localStorage.setItem(CART_STORAGE_KEY, serialized)
    return { success: true }
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'QuotaExceededError') {
        return {
          success: false,
          error: 'Storage full. Cart will be lost on page refresh.',
        }
      } else {
        return {
          success: false,
          error: `Failed to save cart: ${error.message}`,
        }
      }
    }
    return { success: false, error: 'Unknown error saving cart' }
  }
}

export const useCart = () => {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0 })
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadCart = async () => {
      try {
        const loadedCart = await loadCartFromStorage()
        setCart(loadedCart)
      } catch (err) {
        console.error('Failed to load cart:', err)
        setError('Failed to load cart from storage')
      } finally {
        setIsLoading(false)
      }
    }

    loadCart()
  }, [])

  useEffect(() => {
    if (isLoading) return

    const result = saveCartToStorage(cart)
    if (result.error) {
      setError(result.error)
    } else {
      setError(null)
    }
  }, [cart, isLoading])

  const addItem = useCallback((product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.items.find((item) => item.id === product.id)

      let newItems: CartItem[]
      if (existingItem) {
        newItems = prevCart.items.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      } else {
        newItems = [...prevCart.items, { ...product, quantity: 1 }]
      }

      return {
        items: newItems,
        total: calculateTotal(newItems),
      }
    })
  }, [])

  const removeItem = useCallback((productId: string) => {
    setCart((prevCart) => {
      const newItems = prevCart.items.filter((item) => item.id !== productId)
      return {
        items: newItems,
        total: calculateTotal(newItems),
      }
    })
  }, [])

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity < 1) {
        removeItem(productId)
        return
      }

      setCart((prevCart) => {
        const newItems = prevCart.items.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
        return {
          items: newItems,
          total: calculateTotal(newItems),
        }
      })
    },
    [removeItem]
  )

  const clearCart = useCallback(() => {
    setCart({ items: [], total: 0 })
  }, [])

  const syncCart = useCallback((syncedCart: Cart) => {
    setCart(syncedCart)
  }, [])

  const getItemCount = useCallback(() => {
    return cart.items.reduce((count, item) => count + item.quantity, 0)
  }, [cart.items])

  return {
    cart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    syncCart,
    getItemCount,
    error,
    isLoading,
  }
}
