import axios from 'axios';
import { config } from './config';

// Save checkout info for a user
export const saveCheckout = async (userId, checkoutData) => {
    const token = sessionStorage.getItem("token");
    const response = await axios.post(
        `${config.serverUrl}/checkout/${userId}`,
        checkoutData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};
