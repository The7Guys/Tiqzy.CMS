<template>
  <header class="bg-blue-500 text-white px-4 md:px-14 py-4 flex items-center justify-between">
    <div class="font-bold">Tiqzy CMS</div>

    <div>
      <button v-if="authStore.token" @click="logout">Logout</button>
    </div>
  </header>

  <main class="px-4 md:px-14 py-4">
    <RouterView />
  </main>
</template>

<script setup>
import { RouterView, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth-store.js'
import { onMounted } from 'vue'

const authStore = useAuthStore()
const router = useRouter()

onMounted(() => {
  if (!authStore.token) {
    // route to login
    router.push({ name: 'login' })
  }
})

const logout = () => {
  authStore.logout()
  router.push({ name: 'login' })
}
</script>

<style scoped></style>
