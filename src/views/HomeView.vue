<template>
  <div>
    <h1>Home</h1>

    <div class="flex gap-4">
      <ButtonComponent
        @click="handleOpenLink('http://grafana-echo-dev.apps.inholland.hcs-lab.nl/login')"
      >
        Open Grafana
      </ButtonComponent>
    </div>
  </div>
</template>

<script setup>
import ButtonComponent from '@/components/inputs/ButtonComponent.vue'

const handleOpenLink = (url) => {
  window.open(url, '_blank')
}
</script>
