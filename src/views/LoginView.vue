<template>
  <div>
    <h1>Login</h1>

    <h2 class="mt-4">With Password</h2>

    <LoginWithPasswordForm />

    <hr class="my-4" />

    <h2>With Token</h2>

    <LoginWithTokenForm />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth-store.js'
import { useRouter } from 'vue-router'
import LoginWithPasswordForm from '@/components/login/LoginWithPasswordForm.vue'
import LoginWithTokenForm from '@/components/login/LoginWithTokenForm.vue'

const authStore = useAuthStore()
const router = useRouter()

onMounted(async () => {
  if (authStore.token) {
    router.push({ name: 'home' })
  }
})
</script>
