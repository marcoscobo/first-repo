<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import PhoneCard from '@/components/PhoneCard.vue'
import ShopIcon from '@/components/ShopIcon.vue'
import { useProductsStore } from '@/stores/products'

const store = useProductsStore()
const { phones, loading, error } = storeToRefs(store)
onMounted(() => {
  store.fetchPhones()
})
</script>

<template>
  <div class="mx-auto max-w-[1320px] px-6 sm:px-10 lg:px-14">
    <section
      class="relative my-8 grid overflow-hidden rounded-[28px] bg-[#e9ede3] md:min-h-[470px] md:grid-cols-2"
      aria-labelledby="hero-heading"
    >
      <div class="relative z-10 px-7 py-10 sm:px-12 sm:py-14 lg:py-16">
        <p
          class="mb-6 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#49624d]"
        >
          <span class="h-1.5 w-1.5 rounded-full bg-[#49624d]"></span> Your everyday, upgraded
        </p>
        <h1
          id="hero-heading"
          class="max-w-md text-[clamp(2.7rem,5.3vw,4.5rem)] leading-[1.04] font-medium tracking-[-0.065em] text-[#203d34]"
        >
          Small device.<br />Big possibilities<span class="text-[#80976a]">.</span>
        </h1>
        <p class="mt-6 max-w-[320px] text-sm leading-7 text-[#657060]">
          For the photos, the plans, and everything in between. Find a phone that feels like you.
        </p>
        <a
          href="#phones"
          class="mt-8 inline-flex items-center gap-8 rounded-full bg-[#203d34] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[#355648]"
          >Find your phone <ShopIcon name="arrow" :size="18"
        /></a>
        <p class="mt-5 text-[11px] tracking-wide text-[#6b7665]">
          Thoughtfully selected. Simply extraordinary.
        </p>
      </div>
      <div class="relative isolate flex min-h-[320px] items-center justify-center md:min-h-full">
        <span
          class="absolute h-[340px] w-[340px] rounded-full bg-[#d9e1cb] sm:h-[400px] sm:w-[400px]"
        ></span>
        <span
          class="absolute h-[290px] w-[290px] rounded-full border border-white/60 sm:h-[350px] sm:w-[350px]"
        ></span>
        <img
          src="/images/nova-x1-pro.svg"
          alt="Nova X1 Pro concept in forest green, showing the triple camera and flowing screen design"
          width="640"
          height="640"
          fetchpriority="high"
          class="relative -mt-10 w-full max-w-[480px] md:mt-0 md:scale-110"
        />
        <div
          class="absolute right-5 bottom-6 rounded-2xl border border-white/70 bg-[#fafbf6]/90 px-5 py-3 backdrop-blur-sm sm:right-8 sm:bottom-8"
        >
          <p class="text-[9px] font-semibold uppercase tracking-[.18em] text-[#7b856f]">
            In the spotlight
          </p>
          <p class="mt-1 text-sm font-semibold text-[#203d34]">
            Nova X1 Pro <span class="ml-3 font-normal text-[#69745f]">€999</span>
          </p>
        </div>
        <span class="absolute top-7 right-7 text-[10px] tracking-[.2em] text-[#819075]"
          >THE NOVA SERIES / 01</span
        >
      </div>
    </section>
    <div
      id="difference"
      class="mb-14 grid scroll-mt-6 gap-5 border-b border-[#ddded4] px-2 pt-1 pb-8 sm:grid-cols-3 sm:gap-8"
    >
      <div class="flex items-center gap-3">
        <ShopIcon name="spark" />
        <div>
          <p class="text-xs font-semibold text-[#344838]">A considered collection</p>
          <p class="mt-1 text-[11px] text-[#777c70]">Eight phones. Plenty of possibilities.</p>
        </div>
      </div>
      <div class="flex items-center gap-3 sm:justify-center">
        <ShopIcon name="shield" />
        <div>
          <p class="text-xs font-semibold text-[#344838]">The details that matter</p>
          <p class="mt-1 text-[11px] text-[#777c70]">Clear specs. A simpler choice.</p>
        </div>
      </div>
      <div class="flex items-center gap-3 sm:justify-end">
        <ShopIcon name="check" />
        <div>
          <p class="text-xs font-semibold text-[#344838]">Something for your everyday</p>
          <p class="mt-1 text-[11px] text-[#777c70]">From pocket-sized to all-out powerful.</p>
        </div>
      </div>
    </div>
    <section
      id="phones"
      class="scroll-mt-8 pb-16"
      aria-labelledby="catalog-heading"
      :aria-busy="loading"
    >
      <div class="mb-8 flex items-end justify-between gap-4">
        <div>
          <p class="mb-2 text-[10px] font-semibold uppercase tracking-[.2em] text-[#7e856e]">
            Find your kind of phone
          </p>
          <h2
            id="catalog-heading"
            class="text-3xl font-medium tracking-[-.045em] text-[#203d34] sm:text-4xl"
          >
            Good things. Great phones.
          </h2>
        </div>
        <p v-if="!loading && !error" class="shrink-0 pb-1 text-xs text-[#7a8072]">
          {{ phones.length }} phones <span class="hidden sm:inline">to make your own</span>
        </p>
      </div>
      <p v-if="loading" role="status" class="rounded-2xl bg-[#efefe8] p-8 text-[#67725d]">
        Loading phones…
      </p>
      <div v-else-if="error" role="alert" class="rounded-2xl bg-red-50 p-8 text-red-800">
        <p>{{ error }}</p>
        <button
          type="button"
          class="mt-3 underline underline-offset-4"
          @click="store.fetchPhones()"
        >
          Try again
        </button>
      </div>
      <ul v-else class="grid grid-cols-1 gap-x-5 gap-y-8 min-[460px]:grid-cols-2 lg:grid-cols-4">
        <li v-for="phone in phones" :key="phone.id"><PhoneCard :phone="phone" /></li>
      </ul>
      <div
        class="mt-12 flex flex-wrap items-center justify-between gap-5 rounded-2xl bg-[#e9ede3] px-7 py-7 sm:px-9"
      >
        <div>
          <p class="text-xl font-medium tracking-tight text-[#203d34]">
            Your next chapter starts here.
          </p>
          <p class="mt-1 text-xs leading-6 text-[#687260]">
            A little more connection. A little more possibility. A phone for whatever comes next.
          </p>
        </div>
        <ShopIcon name="spark" :size="34" />
      </div>
    </section>
  </div>
</template>
