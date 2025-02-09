import React, { useEffect, useState } from "react";

const KidsPage = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [likes, setLikes] = useState({});
    const [ratings, setRatings] = useState({});
    const [comments, setComments] = useState({});
    const [newComment, setNewComment] = useState({});
    const [showCommentBox, setShowCommentBox] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        const fetchKidsNews = async () => {
            try {
                const response = await fetch(
                    "https://newsapi.org/v2/everything?q=anime&apiKey=16f95d5164b84c4f9881904dfc930ebb"
                );
                if (!response.ok) throw new Error("Error fetching news");
                const data = await response.json();

                // Filtrar noticias aptas para niños
                const safeKeywords = [
                    "Dragon Ball",
                    "Pokémon",
                    "One Piece",
                    "Naruto",
                    "Studio Ghibli",
                    "Digimon",
                ];
                const filteredNews = data.articles.filter((article) =>
                    safeKeywords.some(
                        (keyword) =>
                            article.title.includes(keyword) ||
                            (article.description && article.description.includes(keyword))
                    )
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

    const toggleLike = (index) => {
        setLikes((prev) => ({
            ...prev,
            [index]: (prev[index] || 0) + 1,
        }));
    };

    const setRating = (index, stars) => {
        setRatings((prev) => ({
            ...prev,
            [index]: stars,
        }));
    };

    const handleCommentSubmit = (index) => {
        if (!newComment[index] || newComment[index].trim() === "") return;

        setComments((prev) => ({
            ...prev,
            [index]: [...(prev[index] || []), { text: newComment[index], replies: [] }],
        }));

        setNewComment((prev) => ({
            ...prev,
            [index]: "",
        }));

        setShowCommentBox((prev) => ({
            ...prev,
            [index]: false,
        }));
    };

    const handleReplySubmit = (index, commentIndex, replyText) => {
        if (!replyText.trim()) return;

        setComments((prev) => {
            const updatedComments = [...(prev[index] || [])];
            // Agregar la respuesta al comentario correspondiente
            updatedComments[commentIndex].replies.push(replyText);
            return { ...prev, [index]: updatedComments };
        });
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedNews = news.slice(startIndex, startIndex + itemsPerPage);

    if (loading)
        return (
            <p style={{ textAlign: "center", color: "#ffcc00", fontSize: "1.5rem" }}>
                ✨ Loading fun news... ✨
            </p>
        );
    if (error)
        return (
            <p style={{ textAlign: "center", color: "red" }}>🚨 Error: {error}</p>
        );

    return (
        <div
            style={{
                maxWidth: "1100px",
                margin: "0 auto",
                color: "#333",
                padding: "20px",
                backgroundColor: "#f7f7f7",
                borderRadius: "20px",
                boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
                marginTop: "100px",
            }}
        >
            <h2
                style={{
                    textAlign: "center",
                    fontSize: "2rem",
                    color: "#ff6600",
                    fontFamily: "Comic Sans MS, sans-serif",
                }}
            >
                📰 Tiny dragons News 🎉
            </h2>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                    gap: "20px",
                    justifyContent: "center",
                }}
            >
                {paginatedNews.map((article, index) => (
                    <div
                        key={index}
                        style={{
                            backgroundColor: "#fff",
                            padding: "15px",
                            borderRadius: "15px",
                            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                            textAlign: "center",
                        }}
                    >
                        {article.urlToImage && (
                            <img
                                src={article.urlToImage}
                                alt={article.title}
                                style={{
                                    width: "100%",
                                    height: "200px",
                                    objectFit: "cover",
                                    borderRadius: "10px",
                                }}
                            />
                        )}
                        <h3 style={{ fontSize: "1.2rem", color: "#ff6600" }}>
                            {article.title}
                        </h3>
                        <p style={{ fontSize: "0.9rem", color: "#666" }}>
                            {article.description}
                        </p>
                        <a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "blue", fontSize: "0.9rem" }}
                        >
                            🔗 Read more
                        </a>

                        {/* Like, Rating & Comment */}
                        <div
                            style={{
                                marginTop: "10px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "15px",
                            }}
                        >
                            <button
                                onClick={() => toggleLike(index)}
                                style={{
                                    cursor: "pointer",
                                    border: "none",
                                    background: "none",
                                    fontSize: "1.5rem",
                                    color: likes[index] ? "red" : "#666",
                                }}
                            >
                                {likes[index] ? "❤️" : "🤍"} {likes[index] || 0}
                            </button>

                            <div>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        onClick={() => setRating(index, star)}
                                        style={{
                                            cursor: "pointer",
                                            fontSize: "1.5rem",
                                            color: "white",
                                        }}
                                    >
                                        {star <= (ratings[index] || 0) ? "🌟" : "⭐"}
                                    </span>
                                ))}
                            </div>

                            <button
                                onClick={() =>
                                    setShowCommentBox((prev) => ({ ...prev, [index]: true }))
                                }
                                style={{
                                    background: "none",
                                    border: "none",
                                    fontSize: "1.5rem",
                                    cursor: "pointer",
                                    color: "#ff6600",
                                }}
                            >
                                💬
                            </button>
                        </div>

                        {showCommentBox[index] && (
                            <div
                                style={{
                                    marginTop: "10px",
                                    padding: "10px",
                                    background: "#ffcc00",
                                    borderRadius: "10px",
                                }}
                            >
                                <textarea
                                    value={newComment[index] || ""}
                                    onChange={(e) =>
                                        setNewComment((prev) => ({ ...prev, [index]: e.target.value }))
                                    }
                                    placeholder="Write a fun comment..."
                                    style={{
                                        width: "100%",
                                        height: "60px",
                                        borderRadius: "10px",
                                        padding: "5px 5px",
                                        fontSize: "1rem",
                                    }}
                                />
                                <button
                                    onClick={() => handleCommentSubmit(index)}
                                    style={{
                                        marginTop: "5px",
                                        padding: "5px 10px",
                                        background: "#ff6600",
                                        color: "white",
                                        borderRadius: "5px",
                                        border: "none",
                                        cursor: "pointer",
                                    }}
                                >
                                    Submit 🎉
                                </button>
                            </div>
                        )}

                        {/* Lista de comentarios */}
                        {comments[index] && comments[index].map((comment, commentIndex) => (
                            <div
                                key={commentIndex}
                                style={{
                                    marginTop: "10px",
                                    padding: "10px",
                                    background: "#333",
                                    borderRadius: "10px",
                                    color: "white",
                                }}
                            >
                                <p>
                                    <strong>User {commentIndex + 1}</strong>: {comment.text}
                                </p>

                                <button
                                    onClick={() => {
                                        const replyText = prompt("Reply here 💬:");
                                        if (replyText) {
                                            handleReplySubmit(index, commentIndex, replyText);
                                        }
                                    }}
                                    style={{
                                        background: "none",
                                        border: "none",
                                        cursor: "pointer",
                                        fontSize: "1rem",
                                        color: "#007BFF",
                                    }}
                                >
                                    💬 Reply
                                </button>

                                {comment.replies.length > 0 && (
                                    <div
                                        style={{
                                            marginTop: "10px",
                                            paddingLeft: "20px",
                                            borderLeft: "2px solid #555",
                                        }}
                                    >
                                        {comment.replies.map((reply, replyIndex) => (
                                            <p
                                                key={replyIndex}
                                                style={{
                                                    fontSize: "0.9rem",
                                                    color: "#bbb",
                                                }}
                                            >
                                                🔹 {reply}
                                            </p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div style={{ textAlign: "center", marginTop: "30px" }}>
                <button
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    disabled={currentPage === 1}
                >
                    ⬅️ Prev
                </button>
                <span style={{ margin: "0 10px" }}>Page {currentPage}</span>
                <button
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={startIndex + itemsPerPage >= news.length}
                >
                    Next ➡️
                </button>
            </div>
        </div>
    );
};

export default KidsPage;
