import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/composables/api.js'

export const useTicketStore = defineStore('ticket', () => {
  const root = '/tickets/tickets'
  const tickets = ref([])

  const fetchTickets = async () => {
    const response = await api.get(root)
    tickets.value = await response.data
  }

  return { tickets, fetchTickets }
})
