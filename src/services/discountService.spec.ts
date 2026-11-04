import { describe, it, expect } from 'vitest'

import { discountService } from './discountService'

describe('discountService.getDiscounts', () => {
  it('returns the Black Friday discounts', async () => {
    const discounts = await discountService.getDiscounts()

    expect(discounts).toHaveLength(4)
    expect(discounts[0]).toEqual({
      phoneId: 'nova-x1-pro',
      percentOff: 20,
      campaign: 'Black Friday',
      startsAt: '2026-11-23T00:00:00+01:00',
      endsAt: '2026-12-01T00:00:00+01:00',
    })
  })

  it('returns copies that do not change the fixture', async () => {
    const first = await discountService.getDiscounts()
    first[0]!.percentOff = 99

    const second = await discountService.getDiscounts()
    expect(second[0]!.percentOff).toBe(20)
  })
})
