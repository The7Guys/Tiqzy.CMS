<template>
  <div>
    <h1>Users</h1>

    <TableComponent>
      <template #table-header>
        <th>ID</th>
        <th>Email</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Actions</th>
      </template>
      <UserEntryTableRow v-for="user in userStore.users" :key="user.id" :user="user" />
    </TableComponent>

    <div class="my-4 gap-x-2 flex items-center">
      <ButtonComponent @click="loadMore(-take)">Previous</ButtonComponent>

      <span> {{ skip + 1 }} - {{ skip + take }} </span>

      <ButtonComponent @click="loadMore(take)">Next</ButtonComponent>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user-store.js'
import { onMounted, ref } from 'vue'
import UserEntryTableRow from '@/components/users/UserEntryTableRow.vue'
import TableComponent from '@/components/TableComponent.vue'
import ButtonComponent from '@/components/inputs/ButtonComponent.vue'

const userStore = useUserStore()
const skip = ref(0)
const take = ref(10)

onMounted(() => {
  userStore.fetchUsers()
})

const loadMore = (diff) => {
  skip.value += diff
  userStore.fetchUsers(skip.value, take.value)
}
</script>
