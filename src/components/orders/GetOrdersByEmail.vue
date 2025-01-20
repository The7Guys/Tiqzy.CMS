<template>
  <div>
    <h1 class="text-lg font-bold mb-4">Orders</h1>

    <!-- Input Form -->
    <div class="mb-4">
      <label for="email" class="block text-sm font-medium text-gray-700 mb-2"> Enter Email: </label>
      <input
        v-model="email"
        id="email"
        type="text"
        placeholder="Enter Email"
        class="p-2 border border-gray-300 rounded w-full mb-2"
      />

      <button
        @click="fetchOrders"
        class="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-2"
      >
        Fetch Orders
      </button>
    </div>

    <!-- Orders Table -->
    <div v-if="orders.length > 0" class="mt-6">
      <TableComponent>
        <template #table-header>
          <th>Order ID</th>
          <th>User Name</th>
          <th>Email</th>
          <th>Status</th>
          <th>Time Slot</th>
          <th>Items</th>
        </template>
        <TableRow v-for="(order, index) in orders" :key="index">
          <td>{{ order.orderId }}</td>
          <td>{{ order.userName || 'Guest' }}</td>
          <td>{{ order.emailAddress }}</td>
          <td>{{ getOrderStatus(order.orderStatus) }}</td>
          <td>{{ formatDate(order.timeSlot) }}</td>
          <td>
            <ul>
              <li v-for="(item, itemIndex) in order.orderItems" :key="itemIndex">
                Ticket ID: {{ item.ticketId }}, Qty: {{ item.quantity }}, Price: ${{
                  item.price.toFixed(2)
                }}
              </li>
            </ul>
          </td>
          <td></td>
        </TableRow>
      </TableComponent>
    </div>

    <!-- No Orders Found -->
    <div v-else-if="ordersFetched && orders.length === 0" class="mt-4 text-red-500">
      No orders found for the provided email.
    </div>

    <!-- Error Message -->
    <div v-else-if="errorMessage" class="mt-4 text-red-500">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
import TableComponent from '@/components/TableComponent.vue'
import TableRow from '@/components/TableRow.vue'
import { ref } from 'vue'
import { useOrderStore } from '@/stores/order-store' // Import the order store

const orderStore = useOrderStore() // Acces
const email = ref('')
const orders = ref([])
const errorMessage = ref(null)
const ordersFetched = ref(false)

// Fetch orders by email
async function fetchOrders() {
  if (!email.value) {
    errorMessage.value = 'Email is required.'
    orders.value = []
    ordersFetched.value = false
    return
  }

  try {
    errorMessage.value = null

    // Use the method from orderstores to fetch orders
    orders.value = await orderStore.getOrdersByEmail(email.value)
    ordersFetched.value = true
  } catch (error) {
    console.error(error) // Log error for debugging
    errorMessage.value = error.message || 'Failed to fetch orders. Please try again.'
    orders.value = []
    ordersFetched.value = false
  }
}

// Format order status
function getOrderStatus(status) {
  const statuses = ['Pending', 'Completed', 'Canceled']
  return statuses[status] || 'Unknown'
}

// Format date
function formatDate(dateString) {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }
  return new Date(dateString).toLocaleDateString(undefined, options)
}
</script>

<style scoped>
button:hover {
  background-color: #2563eb;
}
</style>
