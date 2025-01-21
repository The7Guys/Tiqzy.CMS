<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4" style="text-align: left !important;">Wishlists</h1>

    <!-- Tab Component -->
    <TabComponent
      :tabs="tabs"
      :components="components"
      default-tab="getAll"
    />
  </div>
</template>

<script>
import TabComponent from "@/components/TabComponent.vue";
import GetAll from "@/components/wishlists/GetAll.vue";
import GetSingle from "@/components/wishlists/GetSingle.vue";
import CreateWishlist from "@/components/wishlists/CreateWishlist.vue";
import GetItems from "@/components/wishlists/GetItems.vue";
import AddItem from "@/components/wishlists/AddItem.vue";
import UpdateItemQuantity from "@/components/wishlists/UpdateItemQuantity.vue";
import GetShared from "@/components/wishlists/GetShared.vue";
import ShareWishlist from "@/components/wishlists/ShareWishlist.vue";
import DisablingShare from "@/components/wishlists/DisablingShare.vue";

export default {
  components: {
    TabComponent,
  },
  data() {
    return {
      // Define the tabs
      tabs: [
        { key: "getAll", label: "Get All Wishlists" },
        { key: "getSingle", label: "Get Single Wishlist" },
        { key: "createWishlist", label: "Create Wishlist" },
        { key: "getItems", label: "Get Wishlist Items" },
        { key: "addItem", label: "Add Item to Wishlist" },
        { key: "updateItemQuantity", label: "Update Item Quantity" },
        { key: "getShared", label: "Get Shared Wishlist" },
        { key: "shareWishlist", label: "Share Wishlist" },
        { key: "disablingShare", label: "Disable Sharing" },
      ],
      // Map tabs to components
      components: {
        getAll: GetAll,
        getSingle: GetSingle,
        createWishlist: CreateWishlist,
        getItems: GetItems,
        addItem: AddItem,
        updateItemQuantity: UpdateItemQuantity,
        getShared: GetShared,
        shareWishlist: ShareWishlist,
        disablingShare: DisablingShare,
      },
    };
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
}
</style>
