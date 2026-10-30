import type { Phone } from '@/types/phone'
import phonesFixture from '@/mocks/phones.json'

// Typed assignment so a fixture that drifts from the Phone model fails type-check.
const phones: Phone[] = phonesFixture

export const productService = {
  async getPhones(): Promise<Phone[]> {
    // Return copies so callers can't mutate the fixture.
    return phones.map((phone) => ({ ...phone }))
  },
}
