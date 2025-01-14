<template>
  <button class="font-bold py-2 px-4 rounded" :class="colorClases">
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  kind: {
    type: String,
    default: 'normal',
  },
})

const colorClases = computed(() => {
  switch (props.kind) {
    case 'danger':
      return 'bg-red-500 hover:bg-red-700 text-white'

    case 'normal':
    default:
      return 'bg-blue-500 hover:bg-blue-700 text-white'
  }
})
</script>
