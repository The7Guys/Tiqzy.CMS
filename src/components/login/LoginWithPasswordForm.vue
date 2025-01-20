<template>
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
</template>

<script setup>
import ButtonComponent from '@/components/inputs/ButtonComponent.vue'
import TextInput from '@/components/inputs/TextInput.vue'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth-store.js'
import { useRouter } from 'vue-router'
import { useLoading } from '@/composables/loading.js'

const email = ref('')
const password = ref('')
const loading = useLoading()
const authStore = useAuthStore()
const errorMessage = ref(null)
const router = useRouter()

const handleSubmit = async () => {
  errorMessage.value = null
  loading.show()
  try {
    await authStore.login(email.value, password.value)
    router.push({ name: 'home' })
  } catch (error) {
    errorMessage.value = error.message
    console.error(error)
  } finally {
    loading.hide()
  }
}
</script>
