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
        <button
          @click="fetchItems"
          class="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Fetch Items
        </button>
      </div>
    </div>

    <!-- Table Display -->
    <div v-if="items.length" class="mt-4">
      <TableComponent>
        <template #table-header>
          <th>Product ID</th>
          <th>Quantity</th>
          <th>Timestamp</th>
        </template>
        <template v-for="item in items" :key="item.RowKey">
          <TableRow>
            <td>{{ item.RowKey }}</td>
            <td>{{ item.Quantity }}</td>
            <td>{{ item.Timestamp }}</td>
          </TableRow>
        </template>
      </TableComponent>
    </div>

    <!-- No Results Message -->
    <div v-else-if="noResults" class="mt-4 text-red-500">
      No items found for the provided GUID.
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
      items: [], // List of items fetched for the GUID
      noResults: false, // Tracks if no items are found
    };
  },
  methods: {
    // Fetch items by GUID
    fetchItems() {
      // Simulate API response
      const mockData = {
        "123e4567-e89b-12d3-a456-426614174000": [
          {
            RowKey: "product_1",
            Quantity: 2,
            Timestamp: "2023-01-15T10:30:00Z",
          },
          {
            RowKey: "product_2",
            Quantity: 1,
            Timestamp: "2023-01-16T11:00:00Z",
          },
        ],
      };

      if (mockData[this.guid]) {
        this.items = mockData[this.guid];
        this.noResults = false;
      } else {
        this.items = [];
        this.noResults = true; // No results found
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
</style>
