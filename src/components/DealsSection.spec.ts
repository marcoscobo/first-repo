import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import DealsSection from './DealsSection.vue'
import type { Deal } from '@/types/discount'
import type { Phone } from '@/types/phone'

const phone: Phone = {
  id: 'test-phone',
  brand: 'Testco',
  model: 'T1',
  price: 999,
  storageGb: 128,
  ramGb: 6,
  screenInches: 6.4,
}

const deal: Deal = {
  phone,
  percentOff: 20,
  salePrice: 799.2,
  campaign: 'Test Sale',
}

const otherDeal: Deal = {
  phone: { ...phone, id: 'test-phone-2', model: 'T2', price: 500 },
  percentOff: 10,
  salePrice: 450,
  campaign: 'Test Sale',
}

describe('DealsSection', () => {
  it('renders one list item per deal', () => {
    const wrapper = mount(DealsSection, { props: { deals: [deal, otherDeal] } })

    expect(wrapper.findAll('li')).toHaveLength(2)
  })

  it('shows brand, model, discount badge, sale price and struck-through original price', () => {
    const wrapper = mount(DealsSection, { props: { deals: [deal] } })
    const text = wrapper.text()

    expect(text).toContain('Testco T1')
    // U+2212 minus sign, not a hyphen
    expect(text).toContain('−20%')
    expect(text).toContain('€799.20')
    expect(wrapper.find('s').text()).toContain('€999.00')
    expect(wrapper.find('s .sr-only').text()).toBe('Was')
  })

  it('uses the campaign name in the heading', () => {
    const wrapper = mount(DealsSection, { props: { deals: [deal] } })

    expect(wrapper.find('h2').text()).toBe('Test Sale deals')
  })
})
