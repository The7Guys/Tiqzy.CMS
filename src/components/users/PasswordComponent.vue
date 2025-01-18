<template>
  <div>
    <h2>Set/Update Password</h2>
    <form @submit.prevent="handlePasswordUpdate">
      <div class="mb-6">
        <label for="oldPassword">Old Password</label>
        <TextInput type="password" name="oldPassword" v-model="oldPassword" />
      </div>

      <div>
        <label for="password">Password</label>
        <TextInput type="password" name="password" v-model="password" />
      </div>

      <div>
        <label for="confirmPassword">Confirm Password</label>
        <TextInput type="password" name="confirmPassword" v-model="confirmPassword" />
      </div>

      <ButtonComponent class="mt-4" type="submit">Submit</ButtonComponent>
    </form>
  </div>
</template>

<script setup>
import TextInput from '@/components/inputs/TextInput.vue'
import { ref } from 'vue'
import { useLoading } from '@/composables/loading.js'
import { useAuthStore } from '@/stores/auth-store.js'
import ButtonComponent from '@/components/inputs/ButtonComponent.vue'
import { useSwal } from '@/composables/swal.js'

const oldPassword = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = useLoading()
const authStore = useAuthStore()
const swal = useSwal()

const handlePasswordUpdate = () => {
  if (password.value === '' || confirmPassword.value === '' || oldPassword.value === '') {
    swal.error({
      text: 'Please fill in all fields.',
    })
    return
  }

  if (password.value !== confirmPassword.value) {
    swal.error({
      text: 'The password and confirm password do not match.',
    })
    return
  }

  loading.show()
  try {
    authStore.updatePassword(oldPassword.value, password.value, confirmPassword.value)
    swal.success()
  } catch (error) {
    console.error(error)
    swal.error({
      text: error.response.data.title,
    })
  } finally {
    loading.hide()
    oldPassword.value = ''
    password.value = ''
    confirmPassword.value = ''
  }
}
</script>
