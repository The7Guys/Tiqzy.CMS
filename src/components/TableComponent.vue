<template>
  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-collapse">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <slot name="table-header" />
      </tr>
    </thead>
    <tbody>
      <slot />
    </tbody>
  </table>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse; /* Ensures proper alignment */
}
th,
td {
  padding: 8px;
  text-align: left;
}
</style>
