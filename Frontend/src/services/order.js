// services/order.js
import axios from 'axios';
import { config } from './config';

const BASE_URL = `${config.serverUrl}/orders`;

// Place a new order
export const placeOrder = async (orderData) => {
  try {
    const response = await axios.post(BASE_URL, orderData);
    return response.data;
  } catch (error) {
    console.error('Error placing order:', error);
    throw error;
  }
};

// Get all orders (optional)
export const getAllOrders = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

// Delete an order by ID (optional)
export const deleteOrder = async (orderId) => {
  try {
    await axios.delete(`${BASE_URL}/${orderId}`);
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
};
