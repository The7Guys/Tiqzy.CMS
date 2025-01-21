<template>
  <div>
    <!-- Input and Button -->
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
        <button @click="fetchItems" class="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Fetch Items
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="mt-4 text-blue-500">Loading items...</div>

    <!-- Table Display -->
    <div v-if="!loading && items.length" class="mt-4">
      <TableComponent>
        <template #table-header>
          <th>Event ID</th>
          <th>Quantity</th>
        </template>
        <template v-for="item in items" :key="item.id">
          <TableRow>
            <td>{{ item.event_id }}</td>
            <td>{{ item.quantity }}</td>
          </TableRow>
        </template>
      </TableComponent>
    </div>

    <!-- No Results Message -->
    <div v-else-if="!loading && noResults" class="mt-4 text-red-500">
      No items found for the provided GUID.
    </div>

    <!-- Error Message -->
    <div v-else-if="!loading && errorMessage" class="mt-4 text-red-500">
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
      guid: '', // Input value for GUID
      items: [], // List of items fetched for the GUID
      noResults: false, // Tracks if no items are found
      loading: false, // Loading state for API call
      errorMessage: null, // Tracks any error messages
    }
  },
  methods: {
    // Fetch items by GUID
    async fetchItems() {
      const baseURL = '/wishlists'

      // Reset states
      this.loading = true
      this.noResults = false
      this.errorMessage = null
      this.items = []

      if (!this.guid) {
        this.loading = false
        this.errorMessage = 'Please enter a valid GUID.'
        return
      }

      try {
        // Make the GET request to fetch wishlist items
        const response = await api.get(`${baseURL}/${this.guid}/items`)

        // Handle null or undefined response.data
        if (!response.data) {
          this.noResults = true
          return
        }

        // Map response data to the items array
        this.items = response.data.map((item) => ({
          id: item.id, // Maps to the backend's `id`
          event_id: item.event_id, // Maps to `event_id`
          quantity: item.quantity, // Maps to `quantity`
        }))

        this.noResults = this.items.length === 0 // Check if items exist
      } catch (error) {
        console.error('Error fetching items:', error)

        if (error.response && error.response.status === 404) {
          // Handle 404 error (No items found)
          this.noResults = true
        } else {
          // Unexpected error
          this.errorMessage = 'An error occurred while fetching items.'
        }
      } finally {
        this.loading = false
      }
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
  background-color: #2563eb;
}
</style>
