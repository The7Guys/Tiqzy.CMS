<template>
  <input
    v-model="text"
    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  />
</template>

<script setup>
import { ref, watch } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: String,
})

const text = ref(props.modelValue)

const handleInput = (e) => {
  emit('update:modelValue', e.target.value)
}

watch(props.modelValue, () => {
  text.value = props.modelValue
})
</script>

<style scoped></style>
