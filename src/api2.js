// api2.js
import axios from 'axios';

const API_URL = 'https://www.animenewsnetwork.com/encyclopedia/api.php';

export const fetchAnimeNews = async () => {
    try {
        const response = await axios.get(API_URL, {
            params: {
                type: 'news',
                nlist: 10, // Número de noticias a obtener
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener las noticias de anime:', error);
        return [];
    }
};
