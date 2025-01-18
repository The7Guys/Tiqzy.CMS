<template>
  <div>
    <!-- Input Form -->
    <div class="mb-4">
      <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
        Enter Email:
      </label>
      <input
        v-model="email"
        id="email"
        type="text"
        placeholder="Enter Email"
        class="p-2 border border-gray-300 rounded w-full mb-2"
      />

      <label for="orderId" class="block text-sm font-medium text-gray-700 mb-2">
        Enter Order ID:
      </label>
      <input
        v-model="orderId"
        id="orderId"
        type="text"
        placeholder="Enter Order ID"
        class="p-2 border border-gray-300 rounded w-full mb-2"
      />

      <button
        @click="fetchOrder"
        class="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-2 mr-2"
      >
        Fetch Order
      </button>
      <button
        @click="clearOrder"
        class="p-2 bg-gray-500 text-white rounded hover:bg-gray-600 mt-2"
      >
        Clear Order
      </button>
    </div>

    <!-- Order Details -->
    <div v-if="orderData" class="mt-6 p-4 border border-gray-300 rounded">
      <h2 class="text-lg font-bold mb-4">Order Details</h2>
      <p><strong>Order ID:</strong> {{ orderData.orderId }}</p>
      <p><strong>User Name:</strong> {{ orderData.userName || "Guest" }}</p>
      <p><strong>Email Address:</strong> {{ orderData.emailAddress }}</p>
      <p><strong>Order Status:</strong> {{ getOrderStatus(orderData.orderStatus) }}</p>
      <p><strong>Time Slot:</strong> {{ formatDate(orderData.timeSlot) }}</p>

      <h3 class="text-md font-bold mt-4 mb-2">Order Items</h3>
      <ul>
        <li
          v-for="(item, index) in orderData.orderItems"
          :key="index"
          class="mb-4 border-b border-gray-200 pb-2"
        >
          <p><strong>Ticket ID:</strong> {{ item.ticketId }}</p>
          <p><strong>Quantity:</strong> {{ item.quantity }}</p>
          <p><strong>Price:</strong> ${{ item.price.toFixed(2) }}</p>
          <p>
            <strong>Base URL:</strong>
            <a :href="item.baseUrl" target="_blank" class="text-blue-500 underline">
              {{ item.baseUrl }}
            </a>
          </p>
        </li>
      </ul>

      <p class="mt-4">
        <strong>Payment URL:</strong>
        <a :href="orderData.paymentUrl" target="_blank" class="text-blue-500 underline">
          {{ orderData.paymentUrl }}
        </a>
      </p>
    </div>

    <!-- Error Message -->
    <div v-else-if="errorMessage" class="mt-4 text-red-500">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import { useOrderStore } from '@/stores/order-store'; // Import the order store
import { ref } from 'vue';

export default {
  setup() {
    const orderStore = useOrderStore(); // Access the store
    const email = ref('');
    const orderId = ref('');
    const orderData = ref(null);
    const errorMessage = ref(null);

    // Fetch order data from the store
    const fetchOrder = async () => {
      if (!email.value || !orderId.value) {
        errorMessage.value = 'Both Email and Order ID are required.';
        orderData.value = null;
        return;
      }

      try {
        const fetchedOrder = await orderStore.getOrderByEmailAndOrderId(
          email.value,
          orderId.value
        );
        orderData.value = fetchedOrder; // Assign the fetched order data
        errorMessage.value = null; // Clear any error messages
      } catch (error) {
        errorMessage.value =
          error.response?.data?.message || 'Failed to fetch order. Please try again.';
        orderData.value = null;
      }
    };

    // Clear the order data
    const clearOrder = () => {
      orderData.value = null;
      errorMessage.value = null;
      email.value = '';
      orderId.value = '';
    };

    // Format order status
    const getOrderStatus = (status) => {
      const statuses = ['Pending', 'Completed', 'Canceled'];
      return statuses[status] || 'Unknown';
    };

    // Format date
    const formatDate = (dateString) => {
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return {
      email,
      orderId,
      orderData,
      errorMessage,
      fetchOrder,
      clearOrder,
      getOrderStatus,
      formatDate,
    };
  },
};
</script>

<style scoped>
button:hover {
  background-color: #2563eb;
}
</style>
