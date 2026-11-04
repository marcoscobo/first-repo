import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

import { discountService } from '@/services/discountService'
import { useProductsStore } from './products'
import { useDiscountsStore } from './discounts'

const STARTS_AT = new Date('2026-11-23T00:00:00+01:00')
const ENDS_AT = new Date('2026-12-01T00:00:00+01:00')

async function loadStores() {
  const products = useProductsStore()
  const store = useDiscountsStore()
  await products.fetchPhones()
  await store.fetchDiscounts()
  return { products, store }
}

describe('discounts store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('loads discounts from the discount service', async () => {
    const store = useDiscountsStore()

    await store.fetchDiscounts()

    expect(store.discounts).toHaveLength(4)
    expect(store.loading).toBe(false)
    expect(store.error).toBeNull()
  })

  it('sets an error when the service fails', async () => {
    vi.spyOn(discountService, 'getDiscounts').mockRejectedValue(new Error('network'))
    const store = useDiscountsStore()

    await store.fetchDiscounts()

    expect(store.discounts).toEqual([])
    expect(store.loading).toBe(false)
    expect(store.error).toBe('Could not load discounts.')
  })

  describe('activeDeals', () => {
    it('returns no deals before the campaign starts', async () => {
      const { store } = await loadStores()

      expect(store.activeDeals(new Date(STARTS_AT.getTime() - 1))).toEqual([])
    })

    it('includes deals exactly at startsAt', async () => {
      const { store } = await loadStores()

      expect(store.activeDeals(STARTS_AT)).toHaveLength(4)
    })

    it('returns every deal with its sale price inside the window', async () => {
      const { store } = await loadStores()

      const deals = store.activeDeals(new Date('2026-11-27T12:00:00+01:00'))

      expect(deals.map((d) => [d.phone.id, d.percentOff, d.salePrice, d.campaign])).toEqual([
        ['nova-x1-pro', 20, 799.2, 'Black Friday'],
        ['orbit-s-plus', 15, 381.65, 'Black Friday'],
        ['kestrel-7', 25, 434.25, 'Black Friday'],
        ['lumen-one', 10, 476.1, 'Black Friday'],
      ])
    })

    it('returns no deals exactly at endsAt', async () => {
      const { store } = await loadStores()

      expect(store.activeDeals(ENDS_AT)).toEqual([])
    })

    it('skips discounts whose phone does not exist', async () => {
      const { store } = await loadStores()
      store.discounts.push({ ...store.discounts[0]!, phoneId: 'ghost-phone' })

      const deals = store.activeDeals(STARTS_AT)

      expect(deals).toHaveLength(4)
      expect(deals.some((d) => d.phone.id === 'ghost-phone')).toBe(false)
    })

    it('rounds the sale price to cents', async () => {
      const { products, store } = await loadStores()
      // 33.33 * 90 / 100 = 29.997 -> 30
      products.phones = [{ ...products.phones[0]!, id: 'nova-x1-pro', price: 33.33 }]
      store.discounts = [{ ...store.discounts[0]!, percentOff: 10 }]

      const deals = store.activeDeals(STARTS_AT)

      expect(deals[0]!.salePrice).toBe(30)
    })
  })
})
