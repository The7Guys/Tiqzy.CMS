<template>
  <div>
    <h1>Payments</h1>

    <TableComponent v-if="paymentStore.payments.length > 0">
      <template #table-header>
        <th>Order ID</th>
        <th>Status</th>
        <th>Total</th>
        <th>User email</th>
        <th>Created at</th>
        <th>Payment method</th>
      </template>
      <TableRow v-for="(payment, index) in paymentStore.payments" :key="index">
        <td>
          {{ payment.rowKey }}
        </td>
        <td>
          {{ payment.status }}
        </td>
        <td>
          {{ payment.price }}
        </td>
        <td>
          {{ payment.userEmail }}
        </td>
        <td>
          {{ formatTimestamp(payment.createdAt) }}
        </td>
        <td>
          {{ payment.paymentMethod }}
        </td>
      </TableRow>
    </TableComponent>

    <div v-else>
      <p>No payments found</p>
    </div>
  </div>
</template>

<script setup>
import TableComponent from '@/components/TableComponent.vue'
import { usePaymentStore } from '@/stores/payment-store.js'
import { onMounted } from 'vue'
import TableRow from '@/components/TableRow.vue'

const paymentStore = usePaymentStore()

onMounted(() => {
  paymentStore.fetchPayments()
})

const formatTimestamp = (timestamp) => {
  let date = new Date(timestamp * 1000)

  return date.toGMTString()
}
</script>

<style scoped>
th {
  padding: 8px;
  text-align: left;
  background-color: #f3f4f6;
}

th:hover {
  background-color: #e5e7eb;
}

td {
  padding: 8px;
}
</style>
