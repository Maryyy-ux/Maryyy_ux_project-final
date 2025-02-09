import React, { useEffect, useState } from "react";

const NewsList = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [likes, setLikes] = useState({});
    const [ratings, setRatings] = useState({});
    const [comments, setComments] = useState({});
    const [newComment, setNewComment] = useState({});
    const [showCommentBox, setShowCommentBox] = useState({});

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch("https://newsapi.org/v2/top-headlines?category=entertainment&apiKey=16f95d5164b84c4f9881904dfc930ebb");
                if (!response.ok) throw new Error("Error fetching news");
                const data = await response.json();
                setNews(data.articles);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
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

    const handleReplySubmit = (articleIndex, commentIndex, replyText) => {
        if (!replyText) return;

        setComments((prev) => {
            const updatedComments = [...(prev[articleIndex] || [])];
            updatedComments[commentIndex].replies.push(replyText);

            return {
                ...prev,
                [articleIndex]: updatedComments,
            };
        });
    };

    if (loading) return <p style={{ textAlign: "center", color: "white" }}>Loading news...</p>;
    if (error) return <p style={{ textAlign: "center", color: "red" }}>Error: {error}</p>;

    return (
        <div style={{ maxWidth: "1200px", margin: "0 auto", marginTop: "80px", color: "white", padding: "20px" }}>
            <h2 style={{ textAlign: "center", fontSize: "2rem" }}>Latest News</h2>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "20px",
                justifyContent: "center"
            }}>
                {news.map((article, index) => (
                    <div key={index} style={{
                        backgroundColor: "#222",
                        padding: "15px",
                        borderRadius: "10px",
                        boxShadow: "0px 0px 8px rgba(255, 255, 255, 0.2)"
                    }}>
                        {article.urlToImage && (
                            <img
                                src={article.urlToImage}
                                alt={article.title}
                                style={{
                                    width: "100%",
                                    height: "auto",
                                    maxHeight: "200px",
                                    objectFit: "cover",
                                    borderRadius: "10px"
                                }}
                            />
                        )}
                        <h3 style={{ fontSize: "1.2rem" }}>{article.title}</h3>
                        <p style={{ fontSize: "0.9rem", color: "#ccc" }}>{article.description}</p>
                        <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ color: "lightblue", fontSize: "0.9rem" }}>Read more</a>

                        {/* Like & Rating */}
                        <div style={{ marginTop: "10px", display: "flex", alignItems: "center", gap: "15px" }}>
                            {/* Likes */}
                            <button onClick={() => toggleLike(index)} style={{ cursor: "pointer", border: "none", background: "none", fontSize: "1.5rem", color: likes[index] ? "red" : "white" }}>
                                {likes[index] ? "❤️" : "🤍"} {likes[index] || 0}
                            </button>

                            {/* Rating */}
                            <div>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        onClick={() => setRating(index, star)}
                                        style={{
                                            cursor: "pointer",
                                            fontSize: "1.5rem",
                                            color: "white"
                                        }}>
                                        {star <= (ratings[index] || 0) ? "🌟" : "⭐"}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Comentarios */}
                        <div style={{ marginTop: "20px" }}>
                            {!showCommentBox[index] ? (
                                <button
                                    onClick={() => setShowCommentBox((prev) => ({ ...prev, [index]: true }))}
                                    style={{ background: "none", border: "none", fontSize: "1.2rem", cursor: "pointer" }}>
                                    📝
                                </button>
                            ) : (
                                <div style={{ marginTop: "10px", padding: "10px", background: "#222", borderRadius: "10px" }}>
                                    <textarea
                                        value={newComment[index] || ""}
                                        onChange={(e) => setNewComment((prev) => ({ ...prev, [index]: e.target.value }))}
                                        placeholder="Write a comment..."
                                        style={{
                                            width: "100%",
                                            height: "60px",
                                            color: "black",
                                            borderRadius: "10px",
                                            padding: "5px",
                                            fontSize: "1rem"
                                        }}
                                    />
                                    <button
                                        onClick={() => handleCommentSubmit(index)}
                                        style={{ marginTop: "5px", padding: "5px 10px", background: "#007BFF", color: "white", borderRadius: "5px", border: "none", cursor: "pointer" }}>
                                        Submit
                                    </button>
                                </div>
                            )}

                            {/* Lista de comentarios */}
                            {comments[index] && comments[index].map((comment, commentIndex) => (
                                <div key={commentIndex} style={{
                                    marginTop: "10px",
                                    padding: "10px",
                                    background: "#333",
                                    borderRadius: "10px",
                                    color: "white"
                                }}>
                                    <p><strong>User {commentIndex + 1}</strong>: {comment.text}</p>

                                    <button
                                        onClick={() => {
                                            const replyText = prompt("Reply here 💬:");
                                            if (replyText) {
                                                handleReplySubmit(index, commentIndex, replyText);
                                            }
                                        }}
                                        style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1rem", color: "#007BFF" }}>
                                        💬 Reply
                                    </button>

                                    {comment.replies.length > 0 && (
                                        <div style={{ marginTop: "10px", paddingLeft: "20px", borderLeft: "2px solid #555" }}>
                                            {comment.replies.map((reply, replyIndex) => (
                                                <p key={replyIndex} style={{ fontSize: "0.9rem", color: "#bbb" }}>🔹 {reply}</p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsList;
