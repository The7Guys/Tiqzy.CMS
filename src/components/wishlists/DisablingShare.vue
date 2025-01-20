<template>
  <div>
    <!-- Input Form -->
    <div class="mb-4">
      <label for="guid" class="block text-sm font-medium text-gray-700 mb-2">
        Enter Wishlist GUID:
      </label>
      <div class="flex space-x-2">
        <input
          v-model="guid"
          id="guid"
          type="text"
          placeholder="Enter GUID"
          class="flex-1 p-2 border border-gray-300 rounded"
        />
        <button
          @click="disableShareWishlist"
          class="p-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Disable Share
        </button>
      </div>
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
      successMessage: null, // Success message
      errorMessage: null, // Error message for invalid input
    }
  },
  methods: {
    // Disable sharing for a wishlist
    async disableShareWishlist() {
      if (!this.guid) {
        this.errorMessage = 'Please enter a valid GUID.'
        this.successMessage = null
        return
      }

      const baseURL = '/wishlists' // Replace with your API endpoint

      try {
        // Make the POST request to disable sharing
        await api.post(`${baseURL}/${this.guid}/disable-share`)

        // Handle the success response
        this.successMessage = `Sharing for Wishlist with GUID '${this.guid}' has been successfully disabled.`
        this.errorMessage = null

        // Clear input field
        this.guid = ''
      } catch (error) {
        console.error('Error disabling share for wishlist:', error)

        // Handle errors
        if (error.response) {
          this.errorMessage = error.response.data.message || 'Failed to disable sharing.'
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
  background-color: #991b1b;
}
</style>
