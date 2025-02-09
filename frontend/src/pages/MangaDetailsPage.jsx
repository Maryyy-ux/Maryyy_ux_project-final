import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MangaDetailsPage = () => {
    const { id } = useParams();
    const [manga, setManga] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [likes, setLikes] = useState(0);

    useEffect(() => {
        const fetchMangaDetails = async () => {
            try {
                const response = await fetch(`https://api.jikan.moe/v4/manga/${id}`);
                if (!response.ok) throw new Error("Error fetching manga details");
                const data = await response.json();
                setManga(data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMangaDetails();
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

    if (loading) return <p>Loading manga details...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!manga) return <p>No manga found.</p>;

    return (
        <div style={{
            display: "flex",
            maxWidth: "1200px",
            margin: "0 auto",
            marginTop: "100px",
            padding: "20px",
            color: "white",
            background: "#222",
            borderRadius: "10px"
        }}>

            <div style={{ flex: "2", paddingRight: "20px" }}>
                <h2>{manga.title}</h2>
                <p><strong>Author:</strong> {manga.authors?.map(author => author.name).join(", ")}</p>
                <p><strong>Genre:</strong> {manga.genres?.map(genre => genre.name).join(", ")}</p>
                <p><strong>Chapter:</strong> {manga.chapters || "Desconocido"}</p>
                <p><strong>Synopsis:</strong> {manga.synopsis}</p>

                {/* Likes */}
                <div style={{ marginTop: "20px" }}>
                    <button onClick={handleLike} style={{ fontSize: "1.2rem", cursor: "pointer", backgroundColor: "white", border: "2px solid white", borderRadius: "20px" }}>❤️ {likes} Likes</button>

                    <div style={{ marginTop: "20px" }}>
                        <h3>Comments</h3>
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Comments..."
                            style={{ width: "100%", height: "50px", color: "black" }}
                        />
                        <button onClick={handleCommentSubmit}>Comment</button>

                        {/* Lista de comentarios */}
                        {comments.map((comment, index) => (
                            <div key={index} style={{ marginTop: "10px", padding: "10px", background: "#333", borderRadius: "5px" }}>
                                <p>{comment.text}</p>
                                <button onClick={() => handleReplySubmit(index, prompt("Reply:💬"))}>💬 Reply</button>

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
                    src={manga.images?.jpg.large_image_url}
                    alt={manga.title}
                    style={{ width: "100%", borderRadius: "10px" }}
                />
            </div>
        </div >
    );
};

export default MangaDetailsPage;
