import { describe, it, expect } from 'vitest'

import { productService } from './productService'

describe('productService.getPhones', () => {
  it('returns the phone catalog', async () => {
    const phones = await productService.getPhones()

    expect(phones).toHaveLength(8)
    expect(phones[0]).toEqual({
      id: 'nova-x1',
      brand: 'Nova',
      model: 'X1',
      price: 699,
      storageGb: 128,
      ramGb: 8,
      screenInches: 6.1,
    })
  })

  it('returns copies that do not change the fixture', async () => {
    const first = await productService.getPhones()
    first[0]!.price = 1

    const second = await productService.getPhones()
    expect(second[0]!.price).toBe(699)
  })
})
