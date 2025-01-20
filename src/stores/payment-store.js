import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/composables/api.js'

export const usePaymentStore = defineStore('payment', () => {
  const root = '/payments/all'
  const payments = ref([])

  const fetchPayments = async () => {
    const response = await api.get(root)
    payments.value = await response.data
  }

  return { payments, fetchPayments }
})
