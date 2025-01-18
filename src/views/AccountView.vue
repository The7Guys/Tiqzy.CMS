<template>
  <div>
    <UserDetails v-if="authStore.user" v-model="authStore.user" />
    <hr class="my-4" />
    <PasswordComponent />
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth-store.js'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import UserDetails from '@/components/users/UserDetails.vue'
import PasswordComponent from '@/components/users/PasswordComponent.vue'

const authStore = useAuthStore()
const router = useRouter()

onMounted(async () => {
  try {
    authStore.user = await authStore.getSelf()
  } catch (error) {
    console.error(error)
    authStore.logout()
    router.push({ name: 'login' })
  }
})
</script>
