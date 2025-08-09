import axios from 'axios';
import {config} from './config';

export const searchProductByName = async (name) => {
  try {
    const response = await axios.get(`${config.serverUrl}/products/search/${name}`);
    return response.data;
  } catch (error) {
    console.error('Error searching product by name:', error);
    return [];
  }
};
