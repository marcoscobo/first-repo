import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import PhoneCard from './PhoneCard.vue'
import type { Phone } from '@/types/phone'

const phone: Phone = {
  id: 'test-phone',
  brand: 'Testco',
  model: 'T1',
  price: 499,
  storageGb: 128,
  ramGb: 6,
  screenInches: 6.4,
}

describe('PhoneCard', () => {
  it('shows brand, model, specs and price', () => {
    const wrapper = mount(PhoneCard, { props: { phone } })
    const text = wrapper.text()

    expect(text).toContain('Testco')
    expect(text).toContain('T1')
    expect(text).toContain('128 GB storage')
    expect(text).toContain('6 GB RAM')
    expect(text).toContain('6.4" screen')
    expect(text).toContain('€499.00')
  })
})
