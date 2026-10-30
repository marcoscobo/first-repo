import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import PriceTag from './PriceTag.vue'

describe('PriceTag', () => {
  it('formats the price in euros', () => {
    const wrapper = mount(PriceTag, { props: { price: 699 } })
    expect(wrapper.text()).toBe('€699.00')
  })
})
