<script setup lang="ts">
import PriceTag from '@/components/PriceTag.vue'
import type { Phone } from '@/types/phone'

defineProps<{
  phone: Phone
}>()
</script>

<template>
  <article class="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
    <div>
      <p class="text-sm text-gray-500">{{ phone.brand }}</p>
      <h2 class="text-lg font-semibold text-gray-900">{{ phone.model }}</h2>
    </div>
    <ul class="text-sm text-gray-600">
      <li>{{ phone.storageGb }} GB storage</li>
      <li>{{ phone.ramGb }} GB RAM</li>
      <li>{{ phone.screenInches }}" screen</li>
    </ul>
    <PriceTag :price="phone.price" />
  </article>
</template>
