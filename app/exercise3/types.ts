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

export type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_CART'; payload: Cart }

export interface BroadcastMessage {
  type: 'CART_UPDATED'
  cart: Cart
  timestamp: number
}
