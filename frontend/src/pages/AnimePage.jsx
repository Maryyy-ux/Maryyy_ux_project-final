import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AnimePage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnimeData = async () => {
            try {
                const response = await fetch("https://api.jikan.moe/v4/top/anime");
                const result = await response.json();
                setData(result.data);
            } catch (err) {
                setError("Failed to load data");
            } finally {
                setLoading(false);
            }
        };

        fetchAnimeData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!data || data.length === 0) return <div>No anime data available.</div>;

    return (
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "70px", color: "white" }}>
            <h1 style={{ textAlign: "center" }}>Anime</h1>
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "20px"
            }}>
                {data.map((anime) => (
                    <Link
                        key={anime.mal_id}
                        to={`/anime/${anime.mal_id}`}
                        style={{ textDecoration: "none", color: "white" }}
                    >
                        <div
                            style={{
                                background: "#333",
                                borderRadius: "10px",
                                padding: "10px",
                                textAlign: "center",
                                transition: "transform 0.2s",
                                cursor: "pointer"
                            }}
                            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                        >
                            <img
                                src={anime.images.jpg.image_url}
                                alt={anime.title}
                                style={{ width: "100%", borderRadius: "10px" }}
                            />
                            <h3 style={{ marginTop: "10px", fontSize: "1rem" }}>{anime.title}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AnimePage;
