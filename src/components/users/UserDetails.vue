<template>
  <div>
    <h2>Details for {{ modelValue.email }}</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="id">ID</label>
        <TextInput type="text" name="id" v-model="modelValue.id" disabled />
      </div>

      <div>
        <label for="firstName">First Name</label>
        <TextInput type="text" name="firstName" v-model="modelValue.firstName" />
      </div>

      <div>
        <label for="lastName">Last Name</label>
        <TextInput type="text" name="lastName" v-model="modelValue.lastName" />
      </div>

      <div>
        <label for="email">Email</label>
        <TextInput type="email" name="email" v-model="modelValue.email" />
      </div>

      <div>
        <label for="phoneNumber">Phone Number</label>
        <TextInput type="tel" name="phoneNumber" v-model="modelValue.phoneNumber" />
      </div>

      <div>
        <label for="role">Role</label>
        <SelectInput name="role" v-model="modelValue.role">
          <option :value="0">Admin</option>
          <option :value="1">User</option>
        </SelectInput>
      </div>

      <div class="flex gap-4 mt-4">
        <ButtonComponent> Submit</ButtonComponent>
      </div>
    </form>
  </div>
</template>

<script setup>
import TextInput from '@/components/inputs/TextInput.vue'
import SelectInput from '@/components/inputs/SelectInput.vue'
import { ref } from 'vue'
import ButtonComponent from '@/components/inputs/ButtonComponent.vue'
import { useUserStore } from '@/stores/user-store.js'
import { useLoading } from '@/composables/loading.js'
import { useSwal } from '@/composables/swal.js'

const modelValue = defineModel()
const userStore = useUserStore()
const loading = useLoading()
const swal = useSwal()

const handleSubmit = async () => {
  // Handle form submission here
  loading.show()

  try {
    await userStore.updateUser(modelValue.value.id, modelValue.value)
    swal.success()
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
