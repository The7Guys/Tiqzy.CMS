import { defineStore } from 'pinia'
import api from '@/composables/api.js'
import { onBeforeMount, ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(null)
  const refreshToken = ref(null)

  onBeforeMount(() => {
    token.value = localStorage.getItem('token')
  })

  const login = async (email, password) => {
    const response = await api.post('/auth/auth/login', { email, password })
    token.value = response.data.token
    refreshToken.value = response.data.refreshToken

    localStorage.setItem('token', response.data.token)
    api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`

    return response
  }

  const logout = () => {
    token.value = null
    localStorage.removeItem('token')
    delete api.defaults.headers.common['Authorization']
  }

  return { token, login, logout }
})
