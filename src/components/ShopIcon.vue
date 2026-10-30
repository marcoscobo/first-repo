<script setup lang="ts">
withDefaults(
  defineProps<{
    name: 'arrow' | 'search' | 'truck' | 'shield' | 'return' | 'spark' | 'check'
    size?: number
  }>(),
  { size: 20 },
)
const paths = {
  arrow: 'M4 12h16m-6-6 6 6-6 6',
  search: 'm21 21-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0',
  truck:
    'M1 5h13v12H1zM14 9h4l4 4v4h-8M7 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0m13 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0',
  shield: 'm12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6zM8 12l3 3 5-6',
  return: 'M4 9h11a6 6 0 0 1 0 12h-3M8 4 3 9l5 5',
  spark: 'm12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3z',
  check: 'm5 12 4 4L19 6',
}
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.6"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path :d="paths[name]" />
  </svg>
</template>
