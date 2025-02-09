import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AnimeDetailsPage = () => {
    const { id } = useParams();
    const [anime, setAnime] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [likes, setLikes] = useState(0);

    useEffect(() => {
        const fetchAnimeDetails = async () => {
            try {
                const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
                if (!response.ok) throw new Error("Error fetching anime details");
                const data = await response.json();
                setAnime(data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAnimeDetails();
    }, [id]);

    const handleLike = () => {
        setLikes(likes + 1);
    };

    const handleCommentSubmit = () => {
        if (newComment.trim() !== "") {
            setComments([...comments, { text: newComment, replies: [] }]);
            setNewComment("");
        }
    };

    const handleReplySubmit = (index, replyText) => {
        const updatedComments = [...comments];
        updatedComments[index].replies.push(replyText);
        setComments(updatedComments);
    };

    if (loading) return <p>Loading anime details...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!anime) return <p>No anime found.</p>;

    return (
        <div style={{
            display: "flex",
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "20px",
            marginTop: "150px",
            color: "white",
            background: "#222",
            borderRadius: "20px"
        }}>
            {/* Sección de Detalles a la izquierda */}
            <div style={{ flex: "2", paddingRight: "20px" }}>
                <h2>{anime.title}</h2>
                <p><strong>Studio:</strong> {anime.studios?.map(studio => studio.name).join(", ") || "Desconocido"}</p>
                <p><strong>Genres:</strong> {anime.genres?.map(genre => genre.name).join(", ")}</p>
                <p><strong>Episodes:</strong> {anime.episodes || "Desconocido"}</p>
                <p><strong>Score:</strong> {anime.score || "N/A"}</p>
                <p><strong>Synopsis:</strong> {anime.synopsis}</p>

                {/* Likes y Comentarios */}
                <div style={{ marginTop: "20px" }}>
                    <button onClick={handleLike} style={{ fontSize: "1.2rem", cursor: "pointer" }}>❤️ {likes} Likes</button>

                    <div style={{ marginTop: "20px" }}>
                        <h3>Comments</h3>
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Comment ..."
                            style={{ width: "100%", height: "60px", color: "black", borderRadius: "20px", padding: "5px" }}
                        />
                        <button onClick={handleCommentSubmit}>Submit</button>

                        {/* Lista de comentarios */}
                        {comments.map((comment, index) => (
                            <div key={index} style={{ marginTop: "10px", padding: "10px", background: "#333", borderRadius: "40px" }}>
                                <p>{comment.text}</p>
                                <button onClick={() => handleReplySubmit(index, prompt("Reply here 💬:"))}>💬 Reply</button>

                                {/* Respuestas */}
                                {comment.replies.map((reply, replyIndex) => (
                                    <p key={replyIndex} style={{ marginLeft: "20px", fontSize: "0.9em", color: "#bbb" }}>🔹 {reply}</p>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sección de Imagen a la derecha */}
            <div style={{ flex: "1", textAlign: "center" }}>
                <img
                    src={anime.images?.jpg.large_image_url}
                    alt={anime.title}
                    style={{ width: "100%", borderRadius: "10px" }}
                />
            </div>
        </div>
    );
};

export default AnimeDetailsPage;
