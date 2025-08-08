import axios from 'axios';
import { config } from './config';

export const getUserOrders = () => {
  return axios.get(`${config.serverUrl}/orders`);
};

export const getOrderDetailsByOrderId = (orderId) => {
  return axios.get(`${config.serverUrl}/order-details/${orderId}`);
};
