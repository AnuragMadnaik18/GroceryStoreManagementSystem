import axios from 'axios';
import { config } from './config';

export const fetchFeedbackAPI = async (productId) => {
  return await axios.get(`${config.serverUrl}/products/${productId}/feedback`);
};

export const submitFeedbackAPI = async (productId, feedbackData) => {
  const token = sessionStorage.getItem("token");
  return await axios.post(`${config.serverUrl}/products/${productId}/feedback`, feedbackData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const getAverageRatingAPI = async (productId) => {
  return await axios.get(`${config.serverUrl}/products/${productId}/feedback/average`);
};
