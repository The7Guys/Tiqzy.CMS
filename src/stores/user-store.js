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

  const updateUser = async (id, data) => {
    const response = await api.put(root + '/' + id, data)
    return response.data
  }

  const createUser = async (data) => {
    const response = await api.post(root, data)
    return response.data
  }

  return { users, fetchUsers, deleteUser, updateUser, createUser }
})
