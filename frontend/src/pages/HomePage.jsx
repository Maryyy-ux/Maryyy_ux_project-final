// Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import NewsList from "../NewsList";

const HomePage = () => {
    return (
        <div className="homepage-container">
            <div className="hero-section">
                <Link to="/anime" className="hero-image anime">Anime</Link>
                <Link to="/manga" className="hero-image manga">Manga</Link>
                <Link to="/news" className="hero-image news">News</Link>
                <Link to="/kids" className="hero-image kids">Kids</Link>
            </div>

            <div className="legal-links">
                <Link to="/privacy-policy" className="legal-link">Privacy Policy</Link>
                <Link to="/terms-of-service" className="legal-link">Terms of Service</Link>
                <Link to="/cookies-policy" className="legal-link">Cookies policy</Link>
            </div>
        </div>
    );
};

export default HomePage;
