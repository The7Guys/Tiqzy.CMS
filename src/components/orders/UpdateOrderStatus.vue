<template>
    <div class="update-order-status">
      <h1>Update Order Status</h1>
  
      <form @submit.prevent="updateStatus">
        <div>
          <label for="orderId">Order ID:</label>
          <input
            id="orderId"
            v-model="form.orderId"
            type="text"
            placeholder="Enter Order ID"
            required
          />
        </div>
  
        <div>
          <label for="emailAddress">Email Address:</label>
          <input
            id="emailAddress"
            v-model="form.emailAddress"
            type="email"
            placeholder="Enter Email Address"
            required
          />
        </div>
  
        <div>
          <label for="status">Order Status:</label>
          <select
            id="status"
            v-model.number="form.status" 
            required
          >
            <option
              v-for="(statusName, statusValue) in statuses"
              :key="statusValue"
              :value="statusValue"
            >
              {{ statusName }}
            </option>
          </select>
        </div>
  
        <button type="submit">Update Status</button>
      </form>
  
      <div v-if="errorMessage" class="error">
        <p>{{ errorMessage }}</p>
      </div>
  
      <div v-if="successMessage" class="success">
        <p>{{ successMessage }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useOrderStore } from '@/stores/order-store';
  
  export default {
    name: 'UpdateOrderStatus',
    setup() {
      const orderStore = useOrderStore();
  
      const form = ref({
        orderId: '',
        emailAddress: '',
        status: 0, // Default to "Pending"
      });
  
      const statuses = {
        0: 'Pending',
        1: 'Processing',
        2: 'Completed',
        3: 'Cancelled',
      };
  
      const errorMessage = ref('');
      const successMessage = ref('');
  
      const updateStatus = async () => {
        try {
          errorMessage.value = '';
          successMessage.value = '';
  
          // Pass the updated status as part of the payload
          const updatedOrder = await orderStore.updateOrderStatus(
            form.value.orderId,
            {
              orderId: form.value.orderId,
              emailAddress: form.value.emailAddress,
              status: form.value.status, // This is now a number
            }
          );
  
          successMessage.value = `Order ID ${updatedOrder.id} status updated successfully to ${statuses[form.value.status]}.`;
          form.value.orderId = '';
          form.value.emailAddress = '';
          form.value.status = 0; // Reset to default
        } catch (error) {
          errorMessage.value =
            error.response?.data?.message ||
            'Failed to update the order status.';
        }
      };
  
      return { form, statuses, errorMessage, successMessage, updateStatus };
    },
  };
  </script>
  
  <style scoped>
  .update-order-status {
    max-width: 500px;
    margin: 0 auto;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  
  form div {
    margin-bottom: 1rem;
  }
  
  form label {
    display: block;
    margin-bottom: 0.5rem;
  }
  
  form input,
  form select {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    padding: 0.7rem 1.5rem;
    font-size: 1rem;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .error {
    color: #d9534f;
    margin-top: 1rem;
  }
  
  .success {
    color: #5cb85c;
    margin-top: 1rem;
  }
  </style>
  