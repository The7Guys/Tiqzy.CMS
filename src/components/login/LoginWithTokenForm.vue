<template>
  <form @submit.prevent="handleSubmit" class="max-w-[400px] flex flex-col gap-2 my-4">
    <div>
      <label for="email">Email</label>
      <TextInput type="email" name="email" v-model="email" />
    </div>

    <div v-if="tokenRequested">
      <label for="token">Token</label>
      <TextInput name="token" v-model="token" />
    </div>

    <div>
      <ButtonComponent type="submit">
        {{ tokenRequested ? 'Login' : 'Request Token' }}
      </ButtonComponent>
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
const token = ref('')
const loading = useLoading()
const authStore = useAuthStore()
const errorMessage = ref(null)
const router = useRouter()
const tokenRequested = ref(false)

const requestToken = async () => {
  errorMessage.value = null
  loading.show()
  try {
    await authStore.requestToken(email.value)
    tokenRequested.value = true
  } catch (error) {
    errorMessage.value = error.message
    console.error(error)
  } finally {
    loading.hide()
  }
}

const handleSubmit = async () => {
  if (!tokenRequested.value) {
    requestToken()
    return
  }

  errorMessage.value = null
  loading.show()
  try {
    await authStore.loginWithToken(email.value, token.value)
    router.push({ name: 'home' })
  } catch (error) {
    errorMessage.value = error.message
    console.error(error)
  } finally {
    loading.hide()
  }
}
</script>
