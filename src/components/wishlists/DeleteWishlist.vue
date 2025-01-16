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
        <button
          @click="deleteWishlist"
          class="p-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete Wishlist
        </button>
      </div>
    </div>

    <!-- Success Message -->
    <div v-if="successMessage" class="mt-4 text-green-500">
      {{ successMessage }}
    </div>

    <!-- Error Message -->
    <div v-else-if="errorMessage" class="mt-4 text-red-500">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      guid: "", // GUID input value
      successMessage: null, // Success message
      errorMessage: null, // Error message for invalid input
    };
  },
  methods: {
    // Simulate deleting a wishlist
    deleteWishlist() {
      if (!this.guid) {
        this.errorMessage = "Please enter a valid GUID.";
        this.successMessage = null;
        return;
      }

      // Mock API response
      this.successMessage = `Wishlist with GUID '${this.guid}' successfully deleted.`;
      this.errorMessage = null;

      // Clear input field
      this.guid = "";
    },
  },
};
</script>

<style scoped>
button:hover {
  background-color: #991b1b;
}
</style>
