'use client'

import { useEffect, useRef } from 'react'
import type { Cart, BroadcastMessage } from '../types'

const CHANNEL_NAME = 'cart-sync-channel'

export const useCartSync = (cart: Cart, onCartUpdate: (cart: Cart) => void) => {
  const channelRef = useRef<BroadcastChannel | null>(null)
  const lastUpdateRef = useRef<number>(0)
  const onCartUpdateRef = useRef(onCartUpdate)

  // Keep callback ref updated
  useEffect(() => {
    onCartUpdateRef.current = onCartUpdate
  }, [onCartUpdate])

  // Create broadcast channel
  useEffect(() => {
    try {
      const channel = new BroadcastChannel(CHANNEL_NAME)
      channelRef.current = channel

      channel.onmessage = (event: MessageEvent<BroadcastMessage>) => {
        const message = event.data

        if (message.type === 'CART_UPDATED' && message.cart && message.timestamp) {
          if (message.timestamp > lastUpdateRef.current) {
            lastUpdateRef.current = message.timestamp
            onCartUpdateRef.current(message.cart)
          }
        }
      }

      return () => {
        channel.close()
        channelRef.current = null
      }
    } catch (error) {
      console.error('Failed to create BroadcastChannel:', error)
    }
  }, [])

  // Broadcast cart changes to other tabs
  useEffect(() => {
    if (!channelRef.current) {
      return
    }

    try {
      const timestamp = Date.now()
      lastUpdateRef.current = timestamp

      const message: BroadcastMessage = {
        type: 'CART_UPDATED',
        cart,
        timestamp,
      }

      channelRef.current.postMessage(message)
    } catch (error) {
      console.error('Failed to broadcast cart update:', error)
    }
  }, [cart])
}
