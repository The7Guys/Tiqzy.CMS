<template>
  <div>
    <!-- Input Form -->
    <div class="mb-4">
      <label for="shareToken" class="block text-sm font-medium text-gray-700 mb-2">
        Enter Share Token:
      </label>
      <div class="flex space-x-2">
        <input
          v-model="shareToken"
          id="shareToken"
          type="text"
          placeholder="Enter Share Token"
          class="flex-1 p-2 border border-gray-300 rounded"
        />
        <button
          @click="fetchSharedWishlist"
          class="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Fetch Shared
        </button>
      </div>
    </div>

    <!-- Table Display -->
    <div v-if="sharedWishlist.length" class="mt-4">
      <TableComponent>
        <template #table-header>
          <th>Event ID</th>
          <th>Quantity</th>
        </template>
        <template v-for="item in sharedWishlist" :key="item.ID">
          <TableRow>
            <td>{{ item.EventID }}</td>
            <td>{{ item.Quantity }}</td>
          </TableRow>
        </template>
      </TableComponent>
    </div>

    <!-- No Results Message -->
    <div v-else-if="noResults" class="mt-4 text-red-500">
      No shared wishlist found for the provided Share Token.
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
      shareToken: '', // Input value for Share Token
      sharedWishlist: [], // List of shared items fetched for the token
      noResults: false, // Tracks if no results are found
    }
  },
  methods: {
    // Fetch shared wishlist by Share Token
    async fetchSharedWishlist() {
      const baseURL = '/wishlists/shared' // Replace with your API endpoint

      if (!this.shareToken) {
        this.noResults = true
        this.sharedWishlist = []
        return
      }

      try {
        // Make the GET request to fetch the shared wishlist
        const response = await api.get(`${baseURL}/${this.shareToken}`)

        // Map the response data to sharedWishlist
        this.sharedWishlist = response.data.map((item) => ({
          ID: item.ID, // ID of the item
          EventID: item.EventID, // Event ID
          Quantity: item.Quantity, // Quantity of the item
        }))

        this.noResults = this.sharedWishlist.length === 0 // Check if results are empty
      } catch (error) {
        console.error('Error fetching shared wishlist:', error)

        // Handle errors
        if (error.response && error.response.status === 404) {
          this.noResults = true // No shared wishlist found
          this.sharedWishlist = []
        } else {
          this.noResults = true
          this.sharedWishlist = []
          alert('An unexpected error occurred.')
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
