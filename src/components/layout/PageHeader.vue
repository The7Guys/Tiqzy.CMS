<template>
  <header class="bg-blue-500 text-white px-4 md:px-14 py-4 flex items-center justify-between">
    <div class="flex gap-4">
      <a href="/" class="font-bold">Tiqzy CMS</a>

      <div v-if="authStore.token" class="flex gap-2">
        <router-link
          v-for="r in routes"
          :key="r.title"
          :to="r.route"
          :class="{ 'font-bold': route.name === r.route.name }"
        >
          {{ r.title }}
        </router-link>
      </div>
    </div>

    <div>
      <button v-if="authStore.token" @click="logout">Logout</button>
    </div>
  </header>
</template>
<script setup>
import { useAuthStore } from '@/stores/auth-store.js'
import { useRoute, useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const logout = () => {
  authStore.logout()
  router.push({ name: 'login' })
}

const routes = [
  {
    title: 'Home',
    route: {
      name: 'home',
    },
  },
  {
    title: 'Users',
    route: {
      name: 'users',
    },
  },
]
</script>
<style scoped></style>
