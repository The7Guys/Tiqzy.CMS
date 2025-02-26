<template>
  <div>
    <!-- Header with Fetch Button -->
    <div class="mb-4 flex items-center space-x-4">
      <button @click="fetchData" class="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Fetch
      </button>
      <div v-if="errorMessage" class="text-red-500">
        {{ errorMessage }}
      </div>
    </div>

    <!-- Filter by email -->
    <div class="mb-4">
      <label for="emailFilter" class="block text-sm font-medium text-gray-700">
        Filter by Email:
      </label>
      <input
        type="text"
        id="emailFilter"
        v-model="filters.email"
        placeholder="Enter email"
        class="mt-1 p-2 border border-gray-300 rounded w-full"
      />
    </div>

    <!-- Table Component -->
    <TableComponent>
      <template #table-header>
        <th @click="sort('id')" class="cursor-pointer">
          GUID <span v-if="sortConfig.key === 'id'">{{ sortArrow }}</span>
        </th>
        <th @click="sort('email')" class="cursor-pointer">
          Email <span v-if="sortConfig.key === 'email'">{{ sortArrow }}</span>
        </th>
        <th @click="sort('is_shared')" class="cursor-pointer">
          Is Shared <span v-if="sortConfig.key === 'is_shared'">{{ sortArrow }}</span>
        </th>
      </template>

      <template v-for="item in filteredAndSortedData" :key="item.id">
        <TableRow>
          <td>{{ item.id }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.is_shared }}</td>
        </TableRow>
      </template>
    </TableComponent>
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
      // Fetched data from the backend
      data: [],
      // Sorting state
      sortConfig: {
        key: '',
        ascending: true,
      },
      // Filters
      filters: {
        email: '',
      },
      // Error message
      errorMessage: null,
    }
  },
  computed: {
    // Filter and sort the data
    filteredAndSortedData() {
      let result = [...this.data]

      // Filter by email
      if (this.filters.email) {
        result = result.filter((item) =>
          item.email.toLowerCase().includes(this.filters.email.toLowerCase()),
        )
      }

      // Sort the data
      if (this.sortConfig.key) {
        result.sort((a, b) => {
          const key = this.sortConfig.key
          const aValue = a[key]
          const bValue = b[key]

          if (aValue < bValue) return this.sortConfig.ascending ? -1 : 1
          if (aValue > bValue) return this.sortConfig.ascending ? 1 : -1
          return 0
        })
      }

      return result
    },
    // Display the correct arrow based on sorting direction
    sortArrow() {
      return this.sortConfig.ascending ? '▲' : '▼'
    },
  },
  methods: {
    // Handle sorting
    sort(key) {
      if (this.sortConfig.key === key) {
        this.sortConfig.ascending = !this.sortConfig.ascending
      } else {
        this.sortConfig.key = key
        this.sortConfig.ascending = true
      }
    },
    // Fetch data from the backend
    async fetchData() {
      try {
        const response = await api.get('/wishlists')
        this.data = response.data
        this.errorMessage = null // Clear error message on success
      } catch (error) {
        console.error('Failed to fetch wishlists:', error)
        this.errorMessage = 'An error occurred while fetching wishlists.'
      }
    },
  },
  mounted() {
    // Fetch data when the component is mounted
    this.fetchData()
  },
}
</script>

<style scoped>
th {
  padding: 8px;
  text-align: left;
  background-color: #f3f4f6;
}

th:hover {
  background-color: #e5e7eb;
}

td {
  padding: 8px;
}

.text-red-500 {
  color: #ef4444;
}
</style>
