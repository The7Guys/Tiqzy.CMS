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

    <!-- Table Display -->
    <div v-if="items.length" class="mt-4">
      <TableComponent>
        <template #table-header>
          <th>Event ID</th>
          <th>Quantity</th>
        </template>
        <template v-for="item in items" :key="item.ID">
          <TableRow>
            <td>{{ item.EventID }}</td>
            <td>{{ item.Quantity }}</td>
          </TableRow>
        </template>
      </TableComponent>
    </div>

    <!-- No Results Message -->
    <div v-else-if="noResults" class="mt-4 text-red-500">No items found for the provided GUID.</div>
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
    }
  },
  methods: {
    // Fetch items by GUID
    async fetchItems() {
      const baseURL = '/wishlists' // Replace with your API URL

      if (!this.guid) {
        this.noResults = true
        this.items = []
        return
      }

      try {
        // Make the GET request to fetch wishlist items
        const response = await api.get(`${baseURL}/${this.guid}/items`)

        // Map response data to the items array
        this.items = response.data.map((item) => ({
          ID: item.ID, // Maps to the backend's RowKey
          EventID: item.EventID, // Event ID
          Quantity: item.Quantity, // Quantity of the item
        }))

        this.noResults = this.items.length === 0 // Check if items exist
      } catch (error) {
        console.error('Error fetching items:', error)

        // Handle errors
        if (error.response && error.response.status === 404) {
          this.noResults = true // No items found
          this.items = []
        } else {
          // Unexpected error
          this.noResults = true
          this.items = []
          alert('An error occurred while fetching items.')
        }
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
