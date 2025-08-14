export const clearCartAPI = async (userId) => {
  const token = sessionStorage.getItem("token");
  return await axios.delete(`${config.serverUrl}/cart/clear/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
import axios from 'axios';
import { config } from './config';

export const addToCartAPI = async (cartItem) => {
  const token = sessionStorage.getItem("token"); // get JWT token from sessionStorage
  return await axios.post(`${config.serverUrl}/cart/add`, cartItem, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getCartByUserIdAPI = async (userId) => {
  const token = sessionStorage.getItem("token");
  return await axios.get(`${config.serverUrl}/cart/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// ✅ DELETE cart item by userId and productId
export const deleteCartItemAPI = async (userId, productId) => {
  const token = sessionStorage.getItem("token");
  return await axios.delete(`${config.serverUrl}/cart/remove/${userId}/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};