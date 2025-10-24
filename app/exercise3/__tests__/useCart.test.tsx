import { renderHook, act } from '@testing-library/react'
import { useCart } from '../hooks/useCart'

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

class MockBroadcastChannel {
  onmessage: ((event: MessageEvent) => void) | null = null
  postMessage = jest.fn()
  close = jest.fn()
}
Object.defineProperty(window, 'BroadcastChannel', {
  value: MockBroadcastChannel,
})

const mockProduct = {
  id: '1',
  name: 'Test Product',
  price: 99.99,
}

describe('useCart', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    localStorageMock.getItem.mockReturnValue(null)
  })

  it('adds products to cart', async () => {
    const { result } = renderHook(() => useCart())

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100))
    })

    act(() => {
      result.current.addItem(mockProduct)
    })

    expect(result.current.cart.items).toHaveLength(1)
    expect(result.current.cart.items[0].name).toBe('Test Product')
    expect(result.current.cart.total).toBe(99.99)
  })

  it('removes products from cart', async () => {
    const { result } = renderHook(() => useCart())

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100))
    })

    act(() => {
      result.current.addItem(mockProduct)
    })

    act(() => {
      result.current.removeItem('1')
    })

    expect(result.current.cart.items).toHaveLength(0)
    expect(result.current.cart.total).toBe(0)
  })

  it('persists cart to localStorage', async () => {
    const { result } = renderHook(() => useCart())

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100))
    })

    act(() => {
      result.current.addItem(mockProduct)
    })

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'shopping-cart',
      expect.stringContaining('"id":"1"')
    )
  })
})
