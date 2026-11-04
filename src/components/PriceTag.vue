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
  <span class="whitespace-nowrap text-sm font-semibold tracking-tight text-[#344b3a]">{{
    formatted
  }}</span>
</template>
