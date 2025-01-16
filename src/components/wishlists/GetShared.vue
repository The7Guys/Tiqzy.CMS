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
          <th>Product ID</th>
          <th>Quantity</th>
          <th>Timestamp</th>
        </template>
        <template v-for="item in sharedWishlist" :key="item.RowKey">
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
      No shared wishlist found for the provided Share Token.
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
      shareToken: "", // Input value for Share Token
      sharedWishlist: [], // List of shared items fetched for the token
      noResults: false, // Tracks if no results are found
    };
  },
  methods: {
    // Fetch shared wishlist by Share Token
    fetchSharedWishlist() {
      // Simulate API response
      const mockData = {
        token123: [
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

      if (mockData[this.shareToken]) {
        this.sharedWishlist = mockData[this.shareToken];
        this.noResults = false;
      } else {
        this.sharedWishlist = [];
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