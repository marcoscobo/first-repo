import { ref } from 'vue'
import { defineStore } from 'pinia'

import { productService } from '@/services/productService'
import type { Phone } from '@/types/phone'

export const useProductsStore = defineStore('products', () => {
  const phones = ref<Phone[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchPhones() {
    loading.value = true
    error.value = null
    try {
      phones.value = await productService.getPhones()
    } catch {
      error.value = 'Could not load phones.'
    } finally {
      loading.value = false
    }
  }

  return { phones, loading, error, fetchPhones }
})
