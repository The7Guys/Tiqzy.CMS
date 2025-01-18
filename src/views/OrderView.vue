<template lang="">
    <div>
        <h1>Orders</h1>

        <TabComponent
        :tabs="tabs"
        :components="components"
        default-tab="getAll"
        />

    </div>
</template>
<script>
    import TabComponent from "@/components/TabComponent.vue";
    import GetOrdersByEmailAndOrderId from "@/components/orders/GetOrdersByEmailAndOrderId.vue";
    import GetOrdersByEmail from "@/components/orders/GetOrdersByEmail.vue";
    import CreateOrder from "@/components/orders/CreateOrder.vue";
    import UpdateOrderStatus from "@/components/orders/UpdateOrderStatus.vue";

export default{
    components: {
        TabComponent,
    },
    data(){
        return{
            tabs: [
                { key: "getOrdersByEmailAndOrderId", label: "Get Orders By Email And Order Id" },
                { key: "getordersbyEmail", label: "Get Orders By Email" },
                {key: "createOrder", label: "CreateOrder"},
                {key: "updateOrderStatus", label: "Update Order Status"},

            ],
            components: {
                getOrdersByEmailAndOrderId: GetOrdersByEmailAndOrderId,
                getordersbyEmail: GetOrdersByEmail,
                createOrder: CreateOrder,
                updateOrderStatus: UpdateOrderStatus,
            },
        };
    },
}
</script>

<style lang="">
    
</style>