import { ref } from 'vue'
import { defineStore } from 'pinia'
// import api from '@/composables/api.js'
import axios from 'axios'

export const usePaymentStore = defineStore('payment', () => {
  // const root = '/payments'
  const payments = ref([])

  const fetchPayments = async () => {
    // const response = await api.get(root)
    const response = await axios.get('http://localhost:8080/payments/all')
    payments.value = await response.data
  }

  return { payments, fetchPayments }
})
