<template>
  <header class="bg-blue-500 text-white px-4 md:px-14 py-4 flex items-center justify-between">
    <div class="flex gap-4">
      <a :href="appUrl" class="font-bold">Tiqzy CMS</a>

      <div v-if="authStore.token" class="flex gap-4">
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

    <div class="flex gap-4">
      <router-link v-if="authStore.user" :to="{ name: 'account' }">
        Account: {{ authStore.user.firstName }}
      </router-link>
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
const appUrl = import.meta.env.BASE_URL

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
  {
    title: 'Tickets for Sale',
    route: {
      name: 'tickets',
    },
  },
  {
    title: 'Wishlists',
    route: {
      name: 'wishlists',
    },
  },
  {
    title: 'Orders',
    route: {
      name: 'orders',
    },
  },
  {
    title: 'Payments',
    route: {
      name: 'payments',
    },
  },
]
</script>
