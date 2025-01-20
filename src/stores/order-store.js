import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/composables/api.js' // Assumes you have an Axios instance here

export const useOrderStore = defineStore('order', () => {
  const orders = ref([])
  const orderDetails = ref(null)
  const errorMessage = ref(null)

  /**
   * Create an order
   * @param {Object} orderDto - The order payload
   */
  const createOrder = async (orderDto) => {
    try {
      const response = await api.post('/orders', orderDto)
      orders.value.push(response.data)
      return response.data
    } catch (error) {
      errorMessage.value = error.response?.data?.message || 'Failed to create order.'
      throw error
    }
  }

  /**
   * Get an order by email and order ID
   * @param {string} emailAddress - Email address of the user
   * @param {string} orderId - Order ID
   */
  const getOrderByEmailAndOrderId = async (emailAddress, orderId) => {
    try {
      const response = await api.get(`/orders/${emailAddress}/${orderId}`)
      orderDetails.value = response.data
      return response.data
    } catch (error) {
      errorMessage.value =
        error.response?.data?.message || `Failed to fetch order with ID: ${orderId}`
      throw error
    }
  }

  /**
   * Update the order status
   * @param {string} orderId - Order ID
   * @param {Object} statusUpdateRequest - Payload with updated status details
   */
  const updateOrderStatus = async (orderId, statusUpdateRequest) => {
    try {
      const response = await api.put(`/orders/${orderId}/status`, statusUpdateRequest)
      const updatedOrder = response.data

      // Update local store if order exists
      const index = orders.value.findIndex((order) => order.id === orderId)
      if (index !== -1) orders.value[index] = updatedOrder

      return updatedOrder
    } catch (error) {
      errorMessage.value = error.response?.data?.message || 'Failed to update the order status.'
      throw error
    }
  }

  /**
   * Get all orders by email
   * @param {string} emailAddress - Email address of the user
   */
  const getOrdersByEmail = async (emailAddress) => {
    try {
      const response = await api.get(`/orders/${emailAddress}`)
      orders.value = response.data
      return response.data
    } catch (error) {
      errorMessage.value =
        error.response?.data?.message || `Failed to fetch orders for email: ${emailAddress}`
      throw error
    }
  }

  return {
    orders,
    orderDetails,
    errorMessage,
    createOrder,
    getOrderByEmailAndOrderId,
    updateOrderStatus,
    getOrdersByEmail,
  }
})
