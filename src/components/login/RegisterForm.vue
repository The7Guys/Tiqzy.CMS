<template>
  <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
    <div>
      <label for="email">Email*</label>
      <TextInput type="email" name="email" v-model="email" />
    </div>

    <div>
      <label for="firstName">First Name*</label>
      <TextInput type="text" name="firstName" v-model="firstName" />
    </div>

    <div>
      <label for="lastName">Last Name*</label>
      <TextInput type="text" name="lastName" v-model="lastName" />
    </div>

    <div>
      <ButtonComponent type="submit"> Register</ButtonComponent>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import TextInput from '@/components/inputs/TextInput.vue'
import ButtonComponent from '@/components/inputs/ButtonComponent.vue'
import { useAuthStore } from '@/stores/auth-store.js'
import { useLoading } from '@/composables/loading.js'
import { useSwal } from '@/composables/swal.js'
import { useRouter } from 'vue-router'

const email = ref('')
const firstName = ref('')
const lastName = ref('')
const authStore = useAuthStore()
const loading = useLoading()
const swal = useSwal()
const router = useRouter()
const emit = defineEmits(['save'])

const props = defineProps({
  login: {
    type: Boolean,
    default: false,
  },
})

const handleSubmit = async () => {
  loading.show()
  try {
    const response = await authStore.register(email.value, firstName.value, lastName.value)
    if (props.login) {
      authStore.token = response.data.token
      authStore.refreshToken = response.data.refreshToken
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('refreshToken', response.data.refreshToken)
      authStore.user = await authStore.getSelf()
      router.push({ name: 'home' })
    }

    emit('save', response.data)
  } catch (error) {
    console.error(error)
    swal.error({
      text: error.response.data.title,
    })
  } finally {
    loading.hide()
  }
}
</script>

<style scoped></style>
