import axios from 'axios';
import { config } from './config';

export const getRecommendedProducts = async (category, excludeId) => {
    try {
        const res = await axios.get(`${config.serverUrl}/products`);
        // Recommend up to 4 other products from the same category, excluding the current product
        return res.data.filter(
            (p) => p.category === category && String(p.id) !== String(excludeId)
        ).slice(0, 4);
    } catch (err) {
        return [];
    }
};
