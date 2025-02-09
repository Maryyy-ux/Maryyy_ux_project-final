import React from "react";
import { Link } from "react-router-dom";

const IntroPage = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                background: "linear-gradient(135deg, #1a1a2e, #16213e)",
                color: "white",
                textAlign: "center",
                padding: "20px"
            }}
        >
            <h1
                style={{
                    fontSize: "3rem",
                    fontWeight: "bold",
                    textShadow: "2px 2px 8px rgba(255, 0, 0, 0.8)"
                }}
            >
                Welcome to Akuma Shirizu
            </h1>

            <p>
                style={{
                    maxWidth: "800px",
                    fontSize: "1.2rem",
                    marginTop: "10px"
                }}

                What is Manga and Anime?</p>

            <p>Manga and anime are two of Japan's most influential cultural exports, captivating audiences worldwide with their unique storytelling and artistic styles. Both mediums have deep historical roots and have evolved into a global phenomenon, shaping entertainment, fashion, and even lifestyle trends.</p>

            <p><strong>Manga: Japanese Comics</strong></p>

            <p>Manga refers to Japanese comic books or graphic novels, typically serialized in magazines before being compiled into volumes. Unlike Western comics, manga is usually read from right to left and comes in various genres, catering to all age groups. Some of the most popular manga series, such as One Piece, Naruto, and Attack on Titan, have gained massive international followings. Manga is not just entertainment; it is a significant part of Japanese literature and a respected art form, influencing storytelling techniques worldwide.</p>

            <p><strong>Anime: Japanese Animation</strong></p>

            <p>Anime refers to animated productions originating from Japan, characterized by vibrant visuals, expressive characters, and compelling narratives. Unlike Western cartoons, anime often delves into complex themes and mature storytelling, making it appealing to both children and adults. Some of the most renowned anime series and films, such as Spirited Away, Dragon Ball, and Demon Slayer, have left a lasting impact on global pop culture. Anime can be adapted from manga, light novels, or original scripts, and it is distributed through television, streaming services, and theatrical releases.</p>

            <p><strong>The Cultural Movement Behind Manga and Anime</strong></p>

            <p>Manga and anime are not just forms of entertainment; they represent a thriving cultural movement that influences various aspects of modern life. The fandom surrounding these mediums has led to conventions, cosplay (costume play), and dedicated online communities where enthusiasts discuss and celebrate their favorite series.</p>

            <p>Japan's otaku culture—a term referring to passionate fans of anime, manga, and video games—has grown significantly, shaping global trends in fashion, technology, and media. Events like Comiket in Japan and Anime Expo in the United States attract thousands of fans, showcasing the widespread appeal of anime and manga culture.</p>

            <p><strong>Tiny Dragons: A Special Space for Young Fans</strong></p>

            <p></p>For younger fans, Tiny Dragons offers a magical space with fun, age-appropriate content introducing them to the world of manga and anime!

            <p>At Akuma Shirizu, we celebrate manga, anime, and otaku culture. Join our community to explore the latest news, reviews, and exclusive content.</p>

            <p
                style={{
                    maxWidth: "800px",
                    fontSize: "1.2rem",
                    marginTop: "10px"
                }}
            >
                <strong>Sign Up!</strong>
            </p>

            {/* Imagen de Dragón Anime */}
            <img
                src="https://i.imgur.com/8OZ6HZG.png"
                alt="Anime Dragon"
                style={{
                    width: "500px",
                    maxWidth: "90%",
                    marginTop: "20px",
                    borderRadius: "15px",
                    boxShadow: "0px 0px 15px rgba(255, 0, 0, 0.8)"
                }}
            />


            <Link to="/home">
                <button
                    style={{
                        marginTop: "20px",
                        padding: "10px 20px",
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        backgroundColor: "#e63946",
                        border: "none",
                        borderRadius: "10px",
                        color: "white",
                        cursor: "pointer",
                        transition: "0.3s",
                        textShadow: "1px 1px 5px rgba(0,0,0,0.7)"
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#ff4757")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#e63946")}
                >
                    Login to the Otaku world
                </button>
            </Link>
        </div>
    );
};

export default IntroPage;
