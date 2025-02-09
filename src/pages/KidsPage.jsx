import React, { useEffect, useState } from "react";

const KidsPage = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const [comments, setComments] = useState({});
    const [commentBoxOpen, setCommentBoxOpen] = useState({});

    useEffect(() => {
        const fetchKidsNews = async () => {
            try {
                const response = await fetch("https://newsapi.org/v2/everything?q=anime&apiKey=16f95d5164b84c4f9881904dfc930ebb");
                if (!response.ok) throw new Error("Error fetching news");
                const data = await response.json();

                // Filtrar noticias aptas para niños
                const safeKeywords = ["Dragon Ball", "Pokémon", "One Piece", "Naruto", "Studio Ghibli", "Digimon"];
                const filteredNews = data.articles.filter(article =>
                    safeKeywords.some(keyword => article.title.includes(keyword) || (article.description && article.description.includes(keyword)))
                );

                setNews(filteredNews);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchKidsNews();
    }, []);

    const handleCommentChange = (index, field, value) => {
        setComments((prev) => ({
            ...prev,
            [index]: { ...prev[index], [field]: value }
        }));
    };

    const toggleCommentBox = (index) => {
        setCommentBoxOpen((prev) => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const handlePageChange = (direction) => {
        setCurrentPage((prev) => prev + direction);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedNews = news.slice(startIndex, startIndex + itemsPerPage);

    if (loading) return <p>Loading kids-friendly news...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div style={{ maxWidth: "1000px", margin: "0 auto", color: "white" }}>
            <h2>Kids-Friendly Anime & Manga News</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
                {paginatedNews.map((article, index) => (
                    <div key={index} style={{ paddingBottom: "10px", borderBottom: "15px solid gray" }}>
                        {article.urlToImage && (
                            <img src={article.urlToImage} alt={article.title} style={{ width: "300px", height: "200px", objectFit: "cover", borderRadius: "5px" }} />
                        )}
                        <h3>{article.title}</h3>
                        <p>{article.description}</p>
                        <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ color: "lightblue" }}>Read more</a>

                        {/* Like, Comment y Rating */}
                        <div style={{ marginTop: "10px", padding: "10px", background: "#222", borderRadius: "5px" }}>
                            <button onClick={() => handleCommentChange(index, "like", !comments[index]?.like || false)}>
                                {comments[index]?.like ? "❤️ Liked" : "🤍 Like"}
                            </button>

                            <select onChange={(e) => handleCommentChange(index, "rating", e.target.value)} value={comments[index]?.rating || ""}>
                                <option value="">Rate</option>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <option key={star} value={star}>{star} ⭐</option>
                                ))}
                            </select>

                            <button onClick={() => toggleCommentBox(index)} style={{ marginLeft: "10px" }}>
                                📝 Comentar
                            </button>

                            {/* Cuadro de comentarios desplegable */}
                            {commentBoxOpen[index] && (
                                <div style={{ marginTop: "10px", padding: "10px", background: "#333", borderRadius: "5px" }}>
                                    <textarea
                                        value={comments[index]?.text || ""}
                                        onChange={(e) => handleCommentChange(index, "text", e.target.value)}
                                        maxLength="180"
                                        placeholder="Escribe tu comentario..."
                                        style={{ width: "100%", height: "40px", color: "black" }}
                                    />
                                    <p>({comments[index]?.text?.length || 0}/180)</p>

                                    {/* Botón para responder comentarios */}
                                    <button onClick={() => handleCommentChange(index, "reply", !comments[index]?.reply || false)}>
                                        {comments[index]?.reply ? "💬 Responder activado" : "💬 Responder"}
                                    </button>

                                    {comments[index]?.reply && (
                                        <textarea
                                            placeholder="Responde al comentario..."
                                            style={{ width: "100%", height: "40px", color: "black", marginTop: "5px" }}
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Paginación */}
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <button onClick={() => handlePageChange(-1)} disabled={currentPage === 1}>Previous</button>
                <span style={{ margin: "0 10px" }}>Page {currentPage}</span>
                <button onClick={() => handlePageChange(1)} disabled={startIndex + itemsPerPage >= news.length}>Next</button>
            </div>
        </div>
    );
};

export default KidsPage;
