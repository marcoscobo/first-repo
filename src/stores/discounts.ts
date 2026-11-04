import { ref } from 'vue'
import { defineStore } from 'pinia'

import { discountService } from '@/services/discountService'
import { useProductsStore } from '@/stores/products'
import type { Deal, Discount } from '@/types/discount'

export const useDiscountsStore = defineStore('discounts', () => {
  const discounts = ref<Discount[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchDiscounts() {
    loading.value = true
    error.value = null
    try {
      discounts.value = await discountService.getDiscounts()
    } catch {
      error.value = 'Could not load discounts.'
    } finally {
      loading.value = false
    }
  }

  /** Deals active at `now` (startsAt inclusive, endsAt exclusive), in fixture order. */
  function activeDeals(now: Date = new Date()): Deal[] {
    const { phones } = useProductsStore()
    const time = now.getTime()
    const deals: Deal[] = []
    for (const discount of discounts.value) {
      if (!(Date.parse(discount.startsAt) <= time && time < Date.parse(discount.endsAt))) continue
      const phone = phones.find((p) => p.id === discount.phoneId)
      if (!phone) continue
      deals.push({
        phone,
        percentOff: discount.percentOff,
        salePrice: Math.round(phone.price * (100 - discount.percentOff)) / 100,
        campaign: discount.campaign,
      })
    }
    return deals
  }

  return { discounts, loading, error, fetchDiscounts, activeDeals }
})
