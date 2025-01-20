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
        <button @click="shareWishlist" class="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Share Wishlist
        </button>
      </div>
    </div>

    <!-- Success Message -->
    <div v-if="shareToken" class="mt-4 text-green-500">
      Share Token: <strong>{{ shareToken }}</strong>
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
      shareToken: null, // Generated share token
      errorMessage: null, // Error message for invalid input
    }
  },
  methods: {
    // Share wishlist to generate a share token
    async shareWishlist() {
      if (!this.guid) {
        this.errorMessage = 'Please enter a valid GUID.'
        this.shareToken = null
        return
      }

      const baseURL = '/wishlists' // Replace with your API endpoint

      try {
        // Make the POST request to generate the share token
        const response = await api.post(`${baseURL}/${this.guid}/share`)

        // Handle the success response
        this.shareToken = response.data.token // Assuming the backend returns the token in `response.data.token`
        this.errorMessage = null
      } catch (error) {
        console.error('Error sharing wishlist:', error)

        // Handle errors
        if (error.response) {
          this.errorMessage = error.response.data.message || 'Failed to share wishlist.'
        } else {
          this.errorMessage = 'An unexpected error occurred.'
        }

        this.shareToken = null
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
