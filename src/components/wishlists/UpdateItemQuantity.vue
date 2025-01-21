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

      <label for="eventId" class="block text-sm font-medium text-gray-700 mb-2">
        Enter Event ID:
      </label>
      <input
        v-model="eventId"
        id="eventId"
        type="text"
        placeholder="Enter Event ID"
        class="p-2 border border-gray-300 rounded w-full mb-2"
      />

      <label for="newQuantity" class="block text-sm font-medium text-gray-700 mb-2">
        Enter New Quantity:
      </label>
      <input
        v-model.number="newQuantity"
        id="newQuantity"
        type="number"
        placeholder="Enter New Quantity"
        class="p-2 border border-gray-300 rounded w-full mb-2"
      />

      <button @click="updateItemQuantity" class="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-2">
        Update Quantity
      </button>
    </div>

    <!-- Success Message -->
    <div v-if="successMessage" class="mt-4 text-green-500">
      {{ successMessage }}
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
      eventId: '', // Event ID input value
      newQuantity: null, // New Quantity input value
      successMessage: null, // Success message
      errorMessage: null, // Error message
    }
  },
  methods: {
    // Update or delete an item based on the new quantity
    async updateItemQuantity() {
      if (!this.guid || !this.eventId || this.newQuantity === null) {
        this.errorMessage = 'All fields are required.'
        this.successMessage = null
        return
      }

      if (this.newQuantity < 0) {
        this.errorMessage = 'Quantity must be 0 or greater.'
        this.successMessage = null
        return
      }

      const baseURL = '/wishlists'

      try {
        // Make the PATCH request to update the item quantity
        const response = await api.patch(
          `${baseURL}/${this.guid}/items/${this.eventId}`,
          {
            new_quantity: this.newQuantity,
          }
        )

        // Handle the success response
        this.successMessage = response.data.message
        this.errorMessage = null

        // Clear input fields
        this.guid = ''
        this.eventId = ''
        this.newQuantity = null
      } catch (error) {
        console.error('Error updating item quantity:', error)

        // Handle errors
        if (error.response) {
          this.errorMessage = error.response.data.message || 'Failed to update item quantity.'
        } else {
          this.errorMessage = 'An unexpected error occurred.'
        }

        this.successMessage = null
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
