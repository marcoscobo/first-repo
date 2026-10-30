import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'

import PhoneCard from '@/components/PhoneCard.vue'
import { productService } from '@/services/productService'
import CatalogView from './CatalogView.vue'

describe('CatalogView', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders a card for each phone', async () => {
    const wrapper = mount(CatalogView)
    await flushPromises()

    expect(wrapper.findAllComponents(PhoneCard)).toHaveLength(8)
  })

  it('shows an error when phones cannot be loaded', async () => {
    vi.spyOn(productService, 'getPhones').mockRejectedValue(new Error('network'))

    const wrapper = mount(CatalogView)
    await flushPromises()

    expect(wrapper.text()).toContain('Could not load phones.')
    expect(wrapper.findAllComponents(PhoneCard)).toHaveLength(0)
  })
})
