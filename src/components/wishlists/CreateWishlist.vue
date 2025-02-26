<template>
  <div>
    <!-- Input and Button -->
    <div class="mb-4">
      <label for="email" class="block text-sm font-medium text-gray-700 mb-2"> Enter Email: </label>
      <div class="flex space-x-2">
        <input
          v-model="email"
          id="email"
          type="email"
          placeholder="Enter email"
          class="flex-1 p-2 border border-gray-300 rounded"
        />
        <button
          @click="createWishlist"
          class="p-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Create
        </button>
      </div>
    </div>

    <!-- Response Display -->
    <div v-if="responseData" class="mt-4">
      <TableComponent>
        <template #table-header>
          <th>Wishlist ID</th>
          <th>Email</th>
          <th>Is Shared</th>
        </template>
        <TableRow>
          <td>{{ responseData.id }}</td>
          <td>{{ responseData.email }}</td>
          <td>{{ responseData.is_shared }}</td>
        </TableRow>
      </TableComponent>
    </div>

    <!-- Error Message -->
    <div v-else-if="errorMessage" class="mt-4 text-red-500">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import TableComponent from '@/components/TableComponent.vue'
import TableRow from '@/components/TableRow.vue'
import api from '@/composables/api.js'

export default {
  components: {
    TableComponent,
    TableRow,
  },
  data() {
    return {
      email: '', // Email input value
      responseData: null, // Response data to display
      errorMessage: null, // Error message for invalid input or server errors
    }
  },
  methods: {
    // Create wishlist via API
    async createWishlist() {
      // Validate email before sending the request
      if (!this.validateEmail(this.email)) {
        this.errorMessage = 'Invalid email format. Please provide a valid email address.'
        this.responseData = null
        return
      }

      const baseURL = '/wishlists'

      try {
        // Make the POST request to create a wishlist
        const response = await api.post(baseURL, { email: this.email })

        // Assign the response data to `responseData`
        this.responseData = response.data
        this.errorMessage = null // Clear error message
      } catch (error) {
        console.error('Error creating wishlist:', error)

        // Handle specific error messages from the backend
        if (error.response) {
          this.errorMessage = error.response.data.message || 'Failed to create wishlist.'
        } else {
          this.errorMessage = 'An unexpected error occurred.'
        }

        this.responseData = null
      }
    },
    // Simple email validation
    validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    },
  },
}
</script>

<style scoped>
th {
  padding: 8px;
  text-align: left;
  background-color: #f3f4f6;
}

td {
  padding: 8px;
}

button:hover {
  background-color: #047857;
}
</style>
