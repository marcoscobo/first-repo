<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import PhoneCard from '@/components/PhoneCard.vue'
import { useProductsStore } from '@/stores/products'

const store = useProductsStore()
const { phones, loading, error } = storeToRefs(store)

onMounted(() => {
  store.fetchPhones()
})
</script>

<template>
  <section>
    <h2 class="mb-6 text-xl font-semibold text-gray-900">Phones</h2>
    <p v-if="loading" class="text-gray-500">Loading phones…</p>
    <p v-else-if="error" class="text-red-600">{{ error }}</p>
    <ul v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <li v-for="phone in phones" :key="phone.id">
        <PhoneCard :phone="phone" />
      </li>
    </ul>
  </section>
</template>
