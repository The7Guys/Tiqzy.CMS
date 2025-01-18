<template>
  <TableRow>
    <td>
      {{ user.id }}
    </td>
    <td>
      {{ user.email }}
    </td>
    <td>
      {{ user.firstName }}
    </td>
    <td>
      {{ user.lastName }}
    </td>
    <div class="gap-2 flex py-1">
      <ButtonComponent @click="handleDetails">Details</ButtonComponent>
      <ButtonComponent @click="handleDelete" kind="danger">Delete</ButtonComponent>
    </div>
  </TableRow>
</template>

<script setup>
import TableRow from '@/components/TableRow.vue'
import ButtonComponent from '@/components/inputs/ButtonComponent.vue'
import { useSwal } from '@/composables/swal.js'
import { useUserStore } from '@/stores/user-store.js'
import { useLoading } from '@/composables/loading.js'

const swal = useSwal()
const userStore = useUserStore()
const loading = useLoading()
const emit = defineEmits(['openDetails'])

const props = defineProps({
  user: Object,
})

const handleDelete = () => {
  swal
    .warning({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    })
    .then(async (result) => {
      if (result.isConfirmed) {
        // Delete user
        loading.show()
        try {
          await userStore.deleteUser(props.user.id)
          await userStore.fetchUsers()
        } catch (error) {
          console.error(error)
        } finally {
          loading.hide()
        }
      }
    })
}

const handleDetails = () => {
  emit('openDetails', props.user)
}
</script>
