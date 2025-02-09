// components/CommentSection.jsx
import React, { useState } from "react";

const CommentSection = ({ comments, onAddComment, onLike }) => {
    const [newComment, setNewComment] = useState("");

    const handleAddComment = () => {
        if (newComment.trim()) {
            onAddComment(newComment);
            setNewComment("");
        }
    };

    return (
        <div className="comment-section">
            <button onClick={() => setNewComment("")}>💬 Comentar</button>
            {newComment !== "" && (
                <div>
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        maxLength={180}
                    />
                    <button onClick={handleAddComment}>Enviar</button>
                </div>
            )}
            <div>
                {(comments || []).map((comment, index) => (
                    <div key={index} className="comment">
                        <p>{comment.text}</p>
                        <button onClick={() => onLike(index)}>👍 {comment.likes}</button>
                        <button>💬 Responder</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentSection;
