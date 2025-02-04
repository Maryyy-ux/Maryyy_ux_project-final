// src/api.jsx
const BASE_URL = "https://api.jikan.moe/v4";

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