<template>
  <div>
    <h1>Users</h1>
    <div class="flex full-width">
      <div :class="{ 'basis-3/5': editedUser, 'w-full': !editedUser }">
        <TableComponent>
          <template #table-header>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </template>
          <UserEntryTableRow
            v-for="user in userStore.users"
            :key="user.id"
            :user="user"
            @open-details="editedUser = $event"
          />
        </TableComponent>

        <div class="my-4 gap-x-2 flex items-center">
          <ButtonComponent @click="loadMore(-take)">Previous</ButtonComponent>

          <span> {{ skip + 1 }} - {{ skip + take }} </span>

          <ButtonComponent @click="loadMore(take)">Next</ButtonComponent>
        </div>
      </div>

      <div v-if="editedUser" class="basis-2/5 px-4">
        <ButtonComponent @click="editedUser = null">Close</ButtonComponent>
        <UserDetails v-model="editedUser" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user-store.js'
import { onMounted, ref } from 'vue'
import UserEntryTableRow from '@/components/users/UserEntryTableRow.vue'
import TableComponent from '@/components/TableComponent.vue'
import ButtonComponent from '@/components/inputs/ButtonComponent.vue'
import UserDetails from '@/components/users/UserDetails.vue'

const userStore = useUserStore()
const skip = ref(0)
const take = ref(10)
const editedUser = ref(null)

onMounted(() => {
  userStore.fetchUsers()
})

const loadMore = (diff) => {
  skip.value += diff
  userStore.fetchUsers(skip.value, take.value)
}
</script>
