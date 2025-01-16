<template>
  <div>
    <!-- Input Form -->
    <div class="mb-4">
      <label for="guid" class="block text-sm font-medium text-gray-700 mb-2">
        Enter Wishlist GUID:
      </label>
      <input
        v-model="guid"
        id="guid"
        type="text"
        placeholder="Enter GUID"
        class="p-2 border border-gray-300 rounded w-full mb-2"
      />

      <label for="productId" class="block text-sm font-medium text-gray-700 mb-2">
        Enter Product ID:
      </label>
      <input
        v-model="productId"
        id="productId"
        type="text"
        placeholder="Enter Product ID"
        class="p-2 border border-gray-300 rounded w-full mb-2"
      />

      <label for="quantity" class="block text-sm font-medium text-gray-700 mb-2">
        Enter Quantity:
      </label>
      <input
        v-model="quantity"
        id="quantity"
        type="number"
        placeholder="Enter Quantity"
        class="p-2 border border-gray-300 rounded w-full mb-2"
      />

      <button
        @click="addItem"
        class="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-2"
      >
        Add Item
      </button>
    </div>

    <!-- Success Message -->
    <div v-if="responseData" class="mt-4 text-green-500">
      {{ responseData }}
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
      productId: "", // Product ID input value
      quantity: "", // Quantity input value
      responseData: null, // Success message
      errorMessage: null, // Error message
    };
  },
  methods: {
    // Simulate adding an item
    addItem() {
      if (!this.guid || !this.productId || !this.quantity) {
        this.errorMessage = "All fields are required.";
        this.responseData = null;
        return;
      }

      // Mock API response
      this.responseData = `Item with Product ID '${this.productId}' and Quantity '${this.quantity}' successfully added to Wishlist '${this.guid}'.`;
      this.errorMessage = null;

      // Clear input fields
      this.guid = "";
      this.productId = "";
      this.quantity = "";
    },
  },
};
</script>

<style scoped>
button:hover {
  background-color: #2563eb;
}
</style>
