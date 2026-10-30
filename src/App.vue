<script setup lang="ts">
import ShopIcon from '@/components/ShopIcon.vue'
</script>

<template>
  <a
    href="#main-content"
    class="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-4"
    >Skip to content</a
  >
  <div class="bg-[#203d34] px-5 py-2.5 text-center text-xs tracking-wide text-[#f7f5ee]">
    A little upgrade. A whole new possibility. <span class="mx-2 opacity-40">|</span> Meet your next
    phone <span aria-hidden="true">↗</span>
  </div>
  <header class="border-b border-[#dfdfd5] bg-[#faf9f6]">
    <div
      class="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-5 px-6 py-6 sm:px-10 lg:px-14"
    >
      <a
        href="#"
        class="flex items-center gap-2.5 text-xl font-bold tracking-tight text-[#203d34]"
        aria-label="Phone Shop home"
      >
        <span class="grid h-9 w-9 place-items-center rounded-xl bg-[#203d34] text-[#e5efb2]"
          ><ShopIcon name="spark" :size="23"
        /></span>
        Phone Shop<span class="text-[#76916d]">.</span>
      </a>
      <nav aria-label="Main navigation" class="flex items-center gap-6 text-sm sm:gap-9">
        <a
          href="#phones"
          class="font-semibold text-[#203d34] underline decoration-[#6d8465] underline-offset-8"
          >Our phones</a
        >
        <a href="#difference" class="text-[#646c63] hover:text-[#203d34]">The little details</a>
      </nav>
      <span class="hidden items-center gap-2 text-xs text-[#64705f] lg:flex"
        ><span class="h-1.5 w-1.5 rounded-full bg-[#7b905b]"></span> Good tech. Thoughtfully
        chosen.</span
      >
    </div>
  </header>
  <main id="main-content"><RouterView /></main>
  <footer class="border-t border-[#ddded4] px-6 py-8 sm:px-10">
    <div
      class="mx-auto flex max-w-[1208px] flex-wrap items-center justify-between gap-4 text-xs text-[#72766b]"
    >
      <p class="text-base font-semibold text-[#203d34]">Phone Shop.</p>
      <p>A fresh perspective on your everyday essential.</p>
      <p>Made for your next chapter.</p>
    </div>
  </footer>
</template>
