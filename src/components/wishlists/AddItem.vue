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
        placeholder="Enter GUID"
        class="p-2 border border-gray-300 rounded w-full mb-2"
      />

      <label for="productId" class="block text-sm font-medium text-gray-700 mb-2">
        Enter Product ID:
      </label>
      <input
        v-model="productId"
        id="productId"
        type="text"
        placeholder="Enter Product ID"
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
      />

      <button @click="addItem" class="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-2">
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
import axios from 'axios'

export default {
  data() {
    return {
      guid: '', // GUID input value
      productId: '', // Product ID input value
      quantity: '', // Quantity input value
      responseData: null, // Success message
      errorMessage: null, // Error message
    }
  },
  methods: {
    // Add item to wishlist
    async addItem() {
      // Validate input fields
      if (!this.guid || !this.productId || !this.quantity) {
        this.errorMessage = 'All fields are required.'
        this.responseData = null
        return
      }

      if (this.quantity <= 0) {
        this.errorMessage = 'Quantity must be greater than zero.'
        this.responseData = null
        return
      }

      const baseURL = 'http://api.tiqzyapi.nl/wishlists' // Replace with your API endpoint

      try {
        // Make the POST request to add the item (no `response` variable needed)
        await axios.post(`${baseURL}/${this.guid}/items`, {
          eventID: this.productId,
          quantity: parseInt(this.quantity, 10),
        })

        // Handle the success response
        this.responseData = `Item with Product ID '${this.productId}' and Quantity '${this.quantity}' successfully added to Wishlist '${this.guid}'.`
        this.errorMessage = null

        // Clear input fields
        this.guid = ''
        this.productId = ''
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
</style>
