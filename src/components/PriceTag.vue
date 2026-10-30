<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  /** Price in EUR. */
  price: number
}>()

const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' })
const formatted = computed(() => formatter.format(props.price))
</script>

<template>
  <span class="text-lg font-semibold text-gray-900">{{ formatted }}</span>
</template>
