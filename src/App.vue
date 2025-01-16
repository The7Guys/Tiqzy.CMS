<template>
  <PageHeader />

  <main class="px-4 md:px-14 py-4">
    <RouterView />
  </main>

  <LoadingOverlay id="global-loading-overlay" style="display: none" />
</template>

<script setup>
import { RouterView, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth-store.js'
import { onMounted } from 'vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import LoadingOverlay from '@/components/LoadingOverlay.vue'

const authStore = useAuthStore()
const router = useRouter()

onMounted(() => {
  //if (!authStore.token) {
  //  router.push({ name: 'login' })
  //}

  // On route change, refresh token
  router.afterEach(() => {
    if (authStore.token) {
      authStore.requestFreshTokens()
    }
  })
})
</script>
