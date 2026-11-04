import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

import { productService } from '@/services/productService'
import { useProductsStore } from './products'

describe('products store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('loads phones from the product service', async () => {
    const store = useProductsStore()

    await store.fetchPhones()

    expect(store.phones).toHaveLength(8)
    expect(store.loading).toBe(false)
    expect(store.error).toBeNull()
  })

  it('sets an error when the service fails', async () => {
    vi.spyOn(productService, 'getPhones').mockRejectedValue(new Error('network'))
    const store = useProductsStore()

    await store.fetchPhones()

    expect(store.phones).toEqual([])
    expect(store.loading).toBe(false)
    expect(store.error).toBe('Could not load phones.')
  })
})
