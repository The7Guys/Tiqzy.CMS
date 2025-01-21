<template>
  <div>
    <!-- Input Form -->
    <div class="mb-4">
      <label for="guid" class="block text-sm font-medium text-gray-700 mb-2">
        Enter Wishlist GUID:
      </label>
      <input
        v-model="guid"
        id="guid"
        type="text"
        placeholder="Enter Wishlist GUID"
        class="p-2 border border-gray-300 rounded w-full mb-2"
      />

      <label for="eventID" class="block text-sm font-medium text-gray-700 mb-2">
        Enter Event ID:
      </label>
      <input
        v-model="eventID"
        id="eventID"
        type="text"
        placeholder="Enter Event ID"
        class="p-2 border border-gray-300 rounded w-full mb-2"
      />

      <label for="quantity" class="block text-sm font-medium text-gray-700 mb-2">
        Enter Quantity:
      </label>
      <input
        v-model="quantity"
        id="quantity"
        type="number"
        placeholder="Enter Quantity"
        class="p-2 border border-gray-300 rounded w-full mb-2"
        min="1"
      />

      <button
        @click="addItem"
        class="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-2 w-full"
      >
        Add Item
      </button>
    </div>

    <!-- Success Message -->
    <div v-if="responseData" class="mt-4 text-green-500">
      {{ responseData }}
    </div>

    <!-- Error Message -->
    <div v-else-if="errorMessage" class="mt-4 text-red-500">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import api from '@/composables/api.js'

export default {
  data() {
    return {
      guid: '', // GUID input value
      eventID: '', // Event ID input value
      quantity: '', // Quantity input value
      responseData: null, // Success message
      errorMessage: null, // Error message
    }
  },
  methods: {
    // Add item to wishlist
    async addItem() {
      // Validate input fields
      if (!this.guid || !this.eventID || !this.quantity) {
        this.errorMessage = 'All fields are required.'
        this.responseData = null
        return
      }

      const parsedQuantity = parseInt(this.quantity, 10)
      if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
        this.errorMessage = 'Quantity must be a positive number.'
        this.responseData = null
        return
      }

      try {
        // Make the POST request to add the item
        const response = await api.post(`/wishlists/${this.guid}/items`, {
          event_id: this.eventID,
          quantity: parsedQuantity,
        })

        // Handle the success response
        this.responseData = response.data.message
        this.errorMessage = null

        // Clear input fields
        this.guid = ''
        this.eventID = ''
        this.quantity = ''
      } catch (error) {
        console.error('Error adding item:', error)

        // Handle the error response
        if (error.response) {
          this.errorMessage = error.response.data.message || 'Failed to add item.'
        } else {
          this.errorMessage = 'An unexpected error occurred.'
        }

        this.responseData = null
      }
    },
  },
}
</script>

<style scoped>
button:hover {
  background-color: #2563eb;
}

input:focus {
  border-color: #2563eb;
  outline: none;
  box-shadow: 0 0 0 1px #2563eb;
}
</style>
