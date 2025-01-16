<template>
  <div class="tab-container">
    <!-- Tabs Navigation -->
    <div class="tabs flex border-b">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        :class="[
          'tab-item p-2 text-sm font-medium',
          activeTab === tab.key ? 'border-b-2 border-blue-500 text-blue-500' : ''
        ]"
        @click="selectTab(tab.key)"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Tab Content -->
    <div class="tab-content mt-4">
      <component :is="activeComponent" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      required: true,
      default: () => [],
    },
    components: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    defaultTab: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      activeTab: this.defaultTab || this.tabs[0]?.key || '',
    };
  },
  computed: {
    activeComponent() {
      return this.components[this.activeTab] || null;
    },
  },
  methods: {
    selectTab(tabKey) {
      this.activeTab = tabKey;
    },
  },
};
</script>

<style scoped>
.tab-item {
  cursor: pointer;
  border-bottom: 2px solid transparent;
}
.tab-item:hover {
  color: #2563eb;
}
.tab-content {
  padding: 16px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
}
</style>
