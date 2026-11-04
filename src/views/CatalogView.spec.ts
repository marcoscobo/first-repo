import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'

import DealsSection from '@/components/DealsSection.vue'
import PhoneCard from '@/components/PhoneCard.vue'
import { discountService } from '@/services/discountService'
import { productService } from '@/services/productService'
import CatalogView from './CatalogView.vue'

describe('CatalogView', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
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

  describe('deals', () => {
    // Only fake Date so flushPromises (setTimeout/microtasks) keeps working.
    function setNow(iso: string) {
      vi.useFakeTimers({ toFake: ['Date'] })
      vi.setSystemTime(new Date(iso))
    }

    it('shows the deals section inside the campaign window', async () => {
      setNow('2026-11-27T12:00:00+01:00')

      const wrapper = mount(CatalogView)
      await flushPromises()

      const section = wrapper.findComponent(DealsSection)
      expect(section.exists()).toBe(true)
      expect(section.props('deals')).toHaveLength(4)
    })

    it('hides the deals section before the campaign window', async () => {
      setNow('2026-11-04T12:00:00+01:00')

      const wrapper = mount(CatalogView)
      await flushPromises()

      expect(wrapper.findComponent(DealsSection).exists()).toBe(false)
    })

    it('still renders phones when discounts cannot be loaded', async () => {
      setNow('2026-11-27T12:00:00+01:00')
      vi.spyOn(discountService, 'getDiscounts').mockRejectedValue(new Error('network'))

      const wrapper = mount(CatalogView)
      await flushPromises()

      expect(wrapper.findComponent(DealsSection).exists()).toBe(false)
      expect(wrapper.text()).not.toContain('Could not load discounts.')
      expect(wrapper.findAllComponents(PhoneCard)).toHaveLength(8)
    })
  })
})
