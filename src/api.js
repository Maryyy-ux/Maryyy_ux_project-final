
const BASE_URL = "https://api.jikan.moe/v4"; // API Jikan
const API_URL = import.meta.env.VITE_API_URL; // URL backend on Render

export const searchAnime = async (query) => {
    const response = await fetch(`${BASE_URL}/anime?q=${encodeURIComponent(query)}&sfw`);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return response.json();
};

export const fetchAnimeDetails = async (id) => {
    const response = await fetch(`${BASE_URL}/anime/${id}`);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return response.json();
};

export const fetchMangaDetails = async (id) => {
    const response = await fetch(`${BASE_URL}/manga/${id}`);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return response.json();
};

//  Backend on Render
export const fetchFromBackend = async (endpoint) => {
    const response = await fetch(`${API_URL}/${endpoint}`);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return response.json();
};
