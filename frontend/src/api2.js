
import axios from 'axios';


const API_URL = import.meta.env.VITE_API_URL || 'https://maryyy-ux-project-final.onrender.com'; 

export const fetchAnimeNews = async () => {
    try {
        
        const response = await axios.get(`${API_URL}/enciclopedia/api.php`, {
            params: {
                type: 'news',
                nlist: 10, 
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener las noticias de anime:', error);
        return [];
    }
};
