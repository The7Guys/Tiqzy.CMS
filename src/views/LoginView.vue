<template>
  <div>
    <h1>Login</h1>

    <form @submit.prevent="handleSubmit" class="max-w-[400px] flex flex-col gap-2 my-4">
      <div>
        <label for="email">Email</label>
        <TextInput type="email" name="email" v-model="email" />
      </div>

      <div>
        <label for="password">Password</label>
        <TextInput type="password" name="password" v-model="password" />
      </div>

      <div>
        <ButtonComponent type="submit">Login</ButtonComponent>
      </div>

      <div class="text-red-700">
        {{ errorMessage }}
      </div>
    </form>
  </div>

  <LoadingOverlay v-if="loading" />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import TextInput from '@/components/inputs/TextInput.vue'
import ButtonComponent from '@/components/inputs/ButtonComponent.vue'
import { useAuthStore } from '@/stores/auth-store.js'
import LoadingOverlay from '@/components/LoadingOverlay.vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('test')
const loading = ref(false)
const authStore = useAuthStore()
const errorMessage = ref(null)
const router = useRouter()

onMounted(() => {
  if (authStore.token) {
    router.push({ name: 'home' })
  }
})

const handleSubmit = async () => {
  errorMessage.value = null
  loading.value = true
  try {
    await authStore.login(email.value, password.value)
  } catch (error) {
    errorMessage.value = error.message
  } finally {
    loading.value = false
  }
}
</script>
