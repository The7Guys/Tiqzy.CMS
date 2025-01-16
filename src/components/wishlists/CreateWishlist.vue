<template>
  <div>
    <!-- Input and Button -->
    <div class="mb-4">
      <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
        Enter Email:
      </label>
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

    <!-- Table Display -->
    <div v-if="responseData" class="mt-4">
      <TableComponent>
        <template #table-header>
          <th>Email</th>
          <th>Message</th>
        </template>
        <TableRow>
          <td>{{ responseData.email }}</td>
          <td>{{ responseData.message }}</td>
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
import TableComponent from "@/components/TableComponent.vue";
import TableRow from "@/components/TableRow.vue";

export default {
  components: {
    TableComponent,
    TableRow,
  },
  data() {
    return {
      email: "", // Email input value
      responseData: null, // Response data to display
      errorMessage: null, // Error message for invalid input
    };
  },
  methods: {
    // Simulate creating a wishlist
    createWishlist() {
      if (!this.email) {
        this.errorMessage = "Please enter a valid email.";
        this.responseData = null;
        return;
      }

      // Mock API response
      const mockResponse = {
        email: this.email,
        message: "Wishlist created successfully!",
      };

      this.responseData = mockResponse;
      this.errorMessage = null;
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
  background-color: #047857;
}
</style>
