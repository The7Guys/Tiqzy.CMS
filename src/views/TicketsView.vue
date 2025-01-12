<template>
  <div>
    <h1>Tickets</h1>

    <TableComponent>
      <template #table-header>
        <th>ID</th>
        <th>Title</th>
        <th>Price</th>
        <th>Stock</th>
        <th>Duration Minutes</th>
      </template>
      <TableRow v-for="(ticket, index) in ticketStore.tickets" :key="index">
        <td>
          {{ ticket.id }}
        </td>
        <td>
          {{ ticket.title }}
        </td>
        <td>
          {{ ticket.price }}
        </td>
        <td>
          {{ ticket.stock }}
        </td>
        <td>
          {{ ticket.duration_minutes }}
        </td>
      </TableRow>
    </TableComponent>
  </div>
</template>

<script setup>
import TableComponent from '@/components/TableComponent.vue'
import { useTicketStore } from '@/stores/ticket-store.js'
import { onMounted } from 'vue'
import TableRow from '@/components/TableRow.vue'

const ticketStore = useTicketStore()

onMounted(() => {
  ticketStore.fetchTickets()
})
</script>
