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

onMounted(async () => {
  // On route change, refresh token
  router.afterEach(() => {
    if (authStore.token) {
      authStore.requestFreshTokens()
    }
  })

  if (!authStore.token) {
    router.push({ name: 'login' })
  } else {
    try {
      authStore.user = await authStore.getSelf()
    } catch (error) {
      console.error(error)
      if (error.response.status === 401) {
        router.push({ name: 'login' })
      }
    }
  }
})
</script>
