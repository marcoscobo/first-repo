<script setup lang="ts">
import { computed } from 'vue'
import PriceTag from '@/components/PriceTag.vue'
import type { Deal } from '@/types/discount'

const props = defineProps<{ deals: Deal[] }>()

// All deals of a run share one campaign; fall back to a generic name if the list is empty.
const campaign = computed(() => props.deals[0]?.campaign ?? 'Black Friday')

// PriceTag has fixed styling, so the struck-through original price is formatted here.
const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' })
</script>

<template>
  <section class="mb-14" aria-labelledby="deals-heading">
    <div class="mb-8">
      <p class="mb-2 text-[10px] font-semibold uppercase tracking-[.2em] text-[#7e856e]">
        Limited-time offers
      </p>
      <h2
        id="deals-heading"
        class="text-3xl font-medium tracking-[-.045em] text-[#203d34] sm:text-4xl"
      >
        {{ campaign }} deals
      </h2>
    </div>
    <ul class="grid grid-cols-1 gap-x-5 gap-y-8 min-[460px]:grid-cols-2 lg:grid-cols-4">
      <li v-for="deal in deals" :key="deal.phone.id">
        <article class="group h-full">
          <div
            class="relative flex aspect-[1/1.04] items-center justify-center overflow-hidden rounded-[20px] bg-[#e9ede3]"
          >
            <span
              class="absolute top-4 left-4 z-10 rounded-full bg-[#203d34] px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white"
              >−{{ deal.percentOff }}%</span
            >
            <img
              :src="`/images/${deal.phone.id}.svg`"
              :alt="`${deal.phone.brand} ${deal.phone.model} concept, front and back`"
              width="640"
              height="640"
              loading="lazy"
              class="w-full transition duration-500 group-hover:scale-105 motion-reduce:transform-none"
            />
          </div>
          <div class="px-1 pt-4">
            <p class="text-[10px] font-medium uppercase tracking-[.16em] text-[#858a7a]">
              {{ deal.phone.brand }}
            </p>
            <h3 class="mt-1.5 text-lg font-semibold tracking-tight text-[#273f32]">
              {{ deal.phone.brand }} {{ deal.phone.model }}
            </h3>
            <p class="mt-1 flex items-baseline gap-2">
              <PriceTag :price="deal.salePrice" />
              <s class="text-xs text-[#858a7a]"
                ><span class="sr-only">Was </span>{{ formatter.format(deal.phone.price) }}</s
              >
            </p>
          </div>
        </article>
      </li>
    </ul>
  </section>
</template>
