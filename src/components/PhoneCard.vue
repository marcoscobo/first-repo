<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import PriceTag from '@/components/PriceTag.vue'
import type { Phone } from '@/types/phone'

const props = defineProps<{ phone: Phone }>()
const imageFailed = ref(false)
watch(
  () => props.phone.id,
  () => {
    imageFailed.value = false
  },
)
const tones: Record<string, { background: string; color: string; label: string }> = {
  Nova: { background: '#e9ede5', color: '#6f8873', label: 'Forest' },
  Orbit: { background: '#edf0f5', color: '#9daec8', label: 'Sky' },
  Kestrel: { background: '#efecf2', color: '#b1a0bc', label: 'Dusk' },
  Lumen: { background: '#f4eee7', color: '#d4ad99', label: 'Soft light' },
}
const tone = computed(() => tones[props.phone.brand] ?? tones.Nova!)
</script>

<template>
  <article class="group h-full">
    <div
      class="relative flex aspect-[1/1.04] items-center justify-center overflow-hidden rounded-[20px]"
      :style="{ backgroundColor: tone.background }"
    >
      <span
        class="absolute top-4 left-4 z-10 rounded-full bg-white/75 px-2.5 py-1 text-[9px] font-medium tracking-wide text-[#57664f]"
        >{{
          phone.screenInches < 6
            ? 'Pocket-sized'
            : phone.ramGb >= 12
              ? 'More possibility'
              : 'Everyday essential'
        }}</span
      >
      <img
        v-if="!imageFailed"
        :src="`/images/${phone.id}.svg`"
        :alt="`${phone.brand} ${phone.model} concept, front and back`"
        width="640"
        height="640"
        loading="lazy"
        class="w-full transition duration-500 group-hover:scale-105 motion-reduce:transform-none"
        @error="imageFailed = true"
      />
      <div
        v-else
        class="grid h-40 w-20 place-items-center rounded-2xl border-4 border-[#506357] bg-[#ccd6c3] text-xs text-[#203d34]"
      >
        {{ phone.brand }}
      </div>
      <span class="absolute right-4 bottom-4 text-[9px] tracking-widest text-[#66715e]"
        >{{ phone.storageGb }} GB</span
      >
    </div>
    <div class="px-1 pt-4">
      <div class="flex items-center justify-between">
        <p class="text-[10px] font-medium uppercase tracking-[.16em] text-[#858a7a]">
          {{ phone.brand }}
        </p>
        <span
          class="inline-block h-3 w-3 rounded-full ring-1 ring-[#a4ab99] ring-offset-2 ring-offset-[#faf9f6]"
          :style="{ backgroundColor: tone.color }"
          :aria-label="tone.label"
          role="img"
        ></span>
      </div>
      <div class="mt-1.5 flex items-baseline justify-between gap-2">
        <h3 class="text-lg font-semibold tracking-tight text-[#273f32]">
          {{ phone.brand }} {{ phone.model }}
        </h3>
        <PriceTag :price="phone.price" />
      </div>
      <ul
        class="mt-3 flex flex-wrap gap-x-3 gap-y-1 border-t border-[#e2e3d9] pt-3 text-[10px] leading-5 text-[#737b69]"
      >
        <li>{{ phone.storageGb }} GB storage</li>
        <li>{{ phone.ramGb }} GB RAM</li>
        <li>{{ phone.screenInches }}" screen</li>
      </ul>
    </div>
  </article>
</template>
