import axios from 'axios';
import { config } from './config';


export const placeOrder = (orderData) => {
  return axios.post(`${config.serverUrl}/orders`, orderData);
};

export const addOrderDetails = (details) => {
  return axios.post(`${config.serverUrl}/order-details`, details);
};
