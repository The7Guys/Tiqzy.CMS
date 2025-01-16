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
    // Fetch item by GUID
    fetchData() {
      const mockData = [
        {
          PartitionKey: "123e4567-e89b-12d3-a456-426614174000",
          RowKey: "product_1",
          Timestamp: "2023-01-15T10:30:00Z",
          email: "user1@example.com",
        },
        {
          PartitionKey: "123e4567-e89b-12d3-a456-426614174001",
          RowKey: "product_2",
          Timestamp: "2023-01-16T11:00:00Z",
          email: "user2@example.com",
        },
      ];

      // Find the item matching the GUID
      const result = mockData.find((data) => data.PartitionKey === this.guid);

      if (result) {
        this.item = result;
        this.noResults = false; // Reset noResults state
      } else {
        this.item = null;
        this.noResults = true; // Show no results message
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
