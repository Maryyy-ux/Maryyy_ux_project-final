import { useState, useEffect } from "react";

const useJikanData = (type, page = 1, limit = 8, order = "popularity") => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                console.log(`Fetching data from: https://api.jikan.moe/v4/${type}?page=${page}&limit=${limit}&order_by=${order}`);
                const response = await fetch(`https://api.jikan.moe/v4/${type}?page=${page}&limit=${limit}&order_by=${order}`);
                const result = await response.json();
                console.log('Fetched data:', result); // Asegúrate de ver la respuesta aquí
                setData(result.data);
            } catch (err) {
                console.error('Error fetching data from Jikan API:', err); // Log para errores
                setError("Failed to load data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [type, page, limit, order]);

    return { data, loading, error };
};

export default useJikanData;
