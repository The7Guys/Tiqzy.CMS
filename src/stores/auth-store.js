import { defineStore } from 'pinia'
import api from '@/composables/api.js'
import { onBeforeMount, ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const root = '/auth/auth'
  const token = ref(null)
  const refreshToken = ref(null)

  onBeforeMount(() => {
    token.value = localStorage.getItem('token')
    refreshToken.value = localStorage.getItem('refreshToken')
  })

  const login = async (email, password) => {
    const response = await api.post(root + '/login', { email, password })
    token.value = response.data.token
    refreshToken.value = response.data.refreshToken

    localStorage.setItem('token', response.data.token)
    localStorage.setItem('refreshToken', response.data.refreshToken)
    api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`

    return response
  }

  const logout = () => {
    token.value = null
    refreshToken.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    delete api.defaults.headers.common['Authorization']
  }

  const getSelf = async () => {
    const response = await api.get(root + '/user')
    return response.data
  }

  const requestFreshTokens = async () => {
    const response = await api.post(root + '/login/refreshtoken', {
      refreshToken: refreshToken.value,
    })
    token.value = response.data.token
    refreshToken.value = response.data.refreshToken
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('refreshToken', response.data.refreshToken)
    api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
  }

  return { token, login, logout, getSelf, requestFreshTokens }
})
