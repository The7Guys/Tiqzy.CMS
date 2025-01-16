<template>
  <div>
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
        <th @click="sort('PartitionKey')" class="cursor-pointer">
          GUID <span v-if="sortConfig.key === 'PartitionKey'">{{ sortArrow }}</span>
        </th>
        <th @click="sort('RowKey')" class="cursor-pointer">
          Product ID <span v-if="sortConfig.key === 'RowKey'">{{ sortArrow }}</span>
        </th>
        <th @click="sort('Timestamp')" class="cursor-pointer">
          Timestamp <span v-if="sortConfig.key === 'Timestamp'">{{ sortArrow }}</span>
        </th>
        <th @click="sort('email')" class="cursor-pointer">
          Email <span v-if="sortConfig.key === 'email'">{{ sortArrow }}</span>
        </th>
        <th @click="sort('IsShared')" class="cursor-pointer">
          Is Shared <span v-if="sortConfig.key === 'IsShared'">{{ sortArrow }}</span>
        </th>
        <th @click="sort('ShareToken')" class="cursor-pointer">
          Share Token <span v-if="sortConfig.key === 'ShareToken'">{{ sortArrow }}</span>
        </th>
        <th @click="sort('Quantity')" class="cursor-pointer">
          Quantity <span v-if="sortConfig.key === 'Quantity'">{{ sortArrow }}</span>
        </th>
      </template>

      <template v-for="item in filteredAndSortedData" :key="item.RowKey">
        <TableRow>
          <td>{{ item.PartitionKey }}</td>
          <td>{{ item.RowKey }}</td>
          <td>{{ item.Timestamp }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.IsShared }}</td>
          <td>{{ item.ShareToken }}</td>
          <td>{{ item.Quantity }}</td>
        </TableRow>
      </template>
    </TableComponent>
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
      // Raw data (example, replace with API data)
      data: [
        {
          PartitionKey: "123e4567-e89b-12d3-a456-426614174000",
          RowKey: "product_1",
          Timestamp: "2023-01-15T10:30:00Z",
          email: "user1@example.com",
          IsShared: true,
          ShareToken: "token123",
          Quantity: 2,
        },
        {
          PartitionKey: "123e4567-e89b-12d3-a456-426614174001",
          RowKey: "product_2",
          Timestamp: "2023-01-16T11:00:00Z",
          email: "user2@example.com",
          IsShared: false,
          ShareToken: "token124",
          Quantity: 1,
        },
        // Add more mock data here
      ],
      // Sorting state
      sortConfig: {
        key: "",
        ascending: true,
      },
      // Filters
      filters: {
        email: "",
      },
    };
  },
  computed: {
    // Filter and sort the data
    filteredAndSortedData() {
      let result = [...this.data];

      // Filter by email
      if (this.filters.email) {
        result = result.filter((item) =>
          item.email.toLowerCase().includes(this.filters.email.toLowerCase())
        );
      }

      // Sort the data
      if (this.sortConfig.key) {
        result.sort((a, b) => {
          const key = this.sortConfig.key;
          const aValue = a[key];
          const bValue = b[key];

          if (aValue < bValue) return this.sortConfig.ascending ? -1 : 1;
          if (aValue > bValue) return this.sortConfig.ascending ? 1 : -1;
          return 0;
        });
      }

      return result;
    },
    // Display the correct arrow based on sorting direction
    sortArrow() {
      return this.sortConfig.ascending ? "▲" : "▼";
    },
  },
  methods: {
    // Handle sorting
    sort(key) {
      if (this.sortConfig.key === key) {
        this.sortConfig.ascending = !this.sortConfig.ascending;
      } else {
        this.sortConfig.key = key;
        this.sortConfig.ascending = true;
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
  position: relative; /* Required for arrow positioning */
}

th:hover {
  background-color: #e5e7eb;
}

td {
  padding: 8px;
}

th span {
  margin-left: 5px; /* Add spacing between column name and arrow */
}
</style>
