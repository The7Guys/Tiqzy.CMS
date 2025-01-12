import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/composables/api.js'

export const useUserStore = defineStore('user', () => {
  const users = ref([])
  const root = '/auth/users'

  const fetchUsers = async (skip = 0, take = 10) => {
    const response = await api.get(root, { params: { skip, take } })
    users.value = await response.data
  }

  const deleteUser = async (id) => {
    await api.delete(root + '/' + id)
  }

  return { users, fetchUsers, deleteUser }
})
