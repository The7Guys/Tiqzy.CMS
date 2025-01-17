<template>
  <div>
    <!-- Input and Button -->
    <div class="mb-4">
      <label for="guid" class="block text-sm font-medium text-gray-700 mb-2">
        Enter GUID:
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
          @click="fetchData"
          class="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Find
        </button>
      </div>
    </div>

    <!-- Table Display -->
    <div v-if="item" class="mt-4">
      <TableComponent>
        <template #table-header>
          <th>GUID</th>
          <th>Product ID</th>
          <th>Timestamp</th>
          <th>Email</th>
        </template>
        <TableRow>
          <td>{{ item.PartitionKey }}</td>
          <td>{{ item.RowKey }}</td>
          <td>{{ item.Timestamp }}</td>
          <td>{{ item.email }}</td>
        </TableRow>
      </TableComponent>
    </div>

    <!-- No Results Message -->
    <div v-else-if="noResults" class="mt-4 text-red-500">
      No item found for the provided GUID.
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useAuthStore } from "@/stores/auth-store"; // Pinia store
import TableComponent from "@/components/TableComponent.vue";
import TableRow from "@/components/TableRow.vue";

export default {
  components: {
    TableComponent,
    TableRow,
  },
  data() {
    return {
      guid: "", // Input value for GUID
      item: null, // Item data fetched by GUID
      noResults: false, // Tracks if no results are found
    };
  },
  methods: {
    // Fetch item by GUID using Axios and Authorization header
    async fetchData() {
      const baseURL = "http://api.tiqzyapi.nl/wishlists/";
      const authStore = useAuthStore(); // Get the auth store
      const token = authStore.token; // Get the token from the store

      try {
        // Make the GET request with Authorization header
        const response = await axios.get(`${baseURL}${this.guid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Assign the response data to `item`
        this.item = response.data;
        this.noResults = false; // Reset noResults state
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // If API responds with 404, no item found
          this.noResults = true;
          this.item = null;
        } else {
          // Log or handle other errors
          console.error("Error fetching data:", error);
        }
      }
    },
  },
};
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
