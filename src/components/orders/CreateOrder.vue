<template>
    <div>
      <h1 class="text-lg font-bold mb-4">Create Order</h1>
  
      <!-- Input Form -->
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
          Enter Email (Required):
        </label>
        <input
          v-model="email"
          id="email"
          type="text"
          placeholder="Enter Email"
          class="p-2 border border-gray-300 rounded w-full mb-4"
        />
  
        <label for="userName" class="block text-sm font-medium text-gray-700 mb-2">
          Enter User Name (Optional):
        </label>
        <input
          v-model="userName"
          id="userName"
          type="text"
          placeholder="Enter User Name"
          class="p-2 border border-gray-300 rounded w-full mb-4"
        />
  
        <label for="timeSlot" class="block text-sm font-medium text-gray-700 mb-2">
          Select Time Slot (UTC):
        </label>
        <input
          v-model="timeSlot"
          id="timeSlot"
          type="datetime-local"
          class="p-2 border border-gray-300 rounded w-full mb-4"
        />
      </div>
  
      <!-- Ticket Selection -->
      <div class="mb-4">
        <h2 class="text-md font-bold mb-2">Select Tickets</h2>
        <div v-if="tickets.length > 0">
          <table class="w-full table-auto border border-gray-300">
            <thead>
              <tr class="bg-gray-100">
                <th class="p-2 border">ID</th>
                <th class="p-2 border">Title</th>
                <th class="p-2 border">Price</th>
                <th class="p-2 border">Stock</th>
                <th class="p-2 border">Quantity</th>
                <th class="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="ticket in tickets" :key="ticket.id">
                <td class="p-2 border">{{ ticket.id }}</td>
                <td class="p-2 border">{{ ticket.title }}</td>
                <td class="p-2 border">${{ ticket.price }}</td>
                <td class="p-2 border">{{ ticket.stock }}</td>
                <td class="p-2 border">
                  <input
                    type="number"
                    min="1"
                    :max="ticket.stock"
                    v-model.number="quantities[ticket.id]"
                    placeholder="Quantity"
                    class="p-1 border border-gray-300 rounded w-16"
                  />
                </td>
                <td class="p-2 border">
                  <button
                    @click="addTicketToOrder(ticket)"
                    class="p-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Add
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="text-gray-500">Loading tickets...</div>
      </div>
  
      <!-- Selected Tickets -->
      <div v-if="orderItems.length > 0" class="mb-4">
        <h2 class="text-md font-bold mb-2">Selected Tickets</h2>
        <ul>
          <li
            v-for="(item, index) in orderItems"
            :key="index"
            class="mb-2 flex justify-between items-center"
          >
            <div>
              <strong>{{ item.ticket.title }}</strong> (ID: {{ item.ticket.id }})
              - Quantity: {{ item.quantity }} - Price: $
              {{ (item.quantity * item.ticket.price).toFixed(2) }}
            </div>
            <button
              @click="removeTicketFromOrder(index)"
              class="p-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Remove
            </button>
          </li>
        </ul>
      </div>
  
      <!-- Submit Order -->
      <button
        @click="submitOrder"
        class="p-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Submit Order
      </button>
  
      <!-- Success or Error Message -->
      <div v-if="successMessage" class="mt-4 text-green-500">
        {{ successMessage }}
      </div>
      <div v-if="errorMessage" class="mt-4 text-red-500">
        {{ errorMessage }}
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useTicketStore } from '@/stores/ticket-store'
  import { useOrderStore } from '@/stores/order-store'
  
  const email = ref('')
  const userName = ref('')
  const timeSlot = ref('')
  const tickets = ref([])
  const quantities = ref({})
  const orderItems = ref([])
  const successMessage = ref(null)
  const errorMessage = ref(null)
  
  const ticketStore = useTicketStore()
    const orderStore = useOrderStore()
  
  // Fetch tickets from the store
  onMounted(async () => {
    try {
      await ticketStore.fetchTickets()
      tickets.value = ticketStore.tickets
    } catch (error) {
      errorMessage.value = 'Failed to fetch tickets.'
    }
  })
  
  // Add a ticket to the order
  function addTicketToOrder(ticket) {
    const quantity = quantities.value[ticket.id]
    if (!quantity || quantity < 1 || quantity > ticket.stock) {
      errorMessage.value = 'Invalid quantity selected.'
      return
    }
  
    const existing = orderItems.value.find((item) => item.ticket.id === ticket.id)
    if (existing) {
      errorMessage.value = 'Ticket already added to the order.'
      return
    }
  
    orderItems.value.push({ ticket, quantity })
    quantities.value[ticket.id] = 0 // Clear the quantity field for this ticket
    errorMessage.value = null
  }
  
  // Remove a ticket from the order
  function removeTicketFromOrder(index) {
    orderItems.value.splice(index, 1)
  }
  
  // Submit the order
  async function submitOrder() {
  if (!email.value) {
    errorMessage.value = 'Email is required.';
    return;
  }

  if (orderItems.value.length === 0) {
    errorMessage.value = 'At least one ticket is required to create an order.';
    return;
  }

  if (!timeSlot.value) {
    errorMessage.value = 'Time Slot is required.';
    return;
  }

  const order = {
    emailAddress: email.value,
    userName: userName.value || null,
    timeSlot: new Date(timeSlot.value).toISOString(),
    orderItems: orderItems.value.map((item) => ({
      ticketId: item.ticket.id,
      quantity: item.quantity,
      price: item.ticket.price,
    })),
  };

  try {
    const createdOrder = await orderStore.createOrder(order); // Ensure this method exists in the store
    successMessage.value = `Order created successfully! Order ID: ${createdOrder.id}`;
    errorMessage.value = null;
    resetForm();
  } catch (error) {
    console.error('Failed to create the order:', error);
    errorMessage.value = error.response?.data?.message || 'Failed to create the order.';
    successMessage.value = null;
  }
}

  </script>
  
  <style scoped>
  button:hover {
    background-color: #2563eb;
  }
  </style>
  