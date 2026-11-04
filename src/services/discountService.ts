import type { Discount } from '@/types/discount'
import discountsFixture from '@/mocks/discounts.json'

// Typed assignment so a fixture that drifts from the Discount model fails type-check.
const discounts: Discount[] = discountsFixture

export const discountService = {
  async getDiscounts(): Promise<Discount[]> {
    // Return copies so callers can't mutate the fixture.
    return discounts.map((discount) => ({ ...discount }))
  },
}
