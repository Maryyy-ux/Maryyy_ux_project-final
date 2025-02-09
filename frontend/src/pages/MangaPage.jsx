import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MangaPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMangaData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch("https://api.jikan.moe/v4/top/manga?sfw");
                const result = await response.json();
                setData(result.data);
            } catch (err) {
                setError("Failed to load data");
            } finally {
                setLoading(false);
            }
        };

        fetchMangaData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!data || data.length === 0) return <div>No manga data available.</div>;

    return (
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px", color: "white" }}>
            <h1 style={{ textAlign: "center" }}>Manga</h1>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
                {data.map((manga) => (
                    <Link
                        key={manga.mal_id}
                        to={`/manga/${manga.mal_id}`}
                        style={{ textDecoration: "none", color: "white" }}
                    >
                        <div
                            style={{
                                background: "#333",
                                borderRadius: "20px",
                                padding: "10px",
                                textAlign: "justify",
                                transition: "transform 0.2s",
                                cursor: "pointer"
                            }}
                            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                        >
                            <img
                                src={manga.images.jpg.image_url}
                                alt={manga.title}
                                style={{ width: "100%", borderRadius: "10px" }}
                            />
                            <h3 style={{ marginTop: "10px", fontSize: "1rem" }}>{manga.title}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default MangaPage;
