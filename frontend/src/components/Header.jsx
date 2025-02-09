// Header.jsx
import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom"; // Importa Link y useLocation
import { FaInstagram, FaYoutube, FaTiktok, FaBars, FaTwitter, FaUser, FaSignOutAlt } from "react-icons/fa";
import { SiBluesky } from "react-icons/si";
import ParentalWarning from "./ParentalWarning";
import "../styles.css";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMinor, setIsMinor] = useState(false);
    const [showParentalWarning, setShowParentalWarning] = useState(false);
    const [scrolling, setScrolling] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const location = useLocation();
    let lastScrollY = window.scrollY;


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            lastScrollY = window.scrollY;

            if (window.scrollY > 50) {
                setScrolling(true);
            } else {
                setScrolling(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    const handleLogin = (age) => {
        setIsLoggedIn(true);
        if (age < 18) {
            setIsMinor(true);
            setShowParentalWarning(true);
        } else {
            setIsMinor(false);
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setIsMinor(false);
    };

    return (
        <header
            className={`header-container ${scrolling ? "hidden" : ""}`}
            style={{
                position: "fixed",
                top: isVisible ? "0" : "-40px",
                width: "100%",
                background: "#1a1a2e",
                padding: "15px 0",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                transition: "top 0.3s",
                textAlign: "center",
                zIndex: 1000,
            }}
        >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>

                <Link to="/">
                    <img
                        src="/Logo_1280.jpg"
                        alt="Akuma Shirizu Logo"
                        style={{ height: "45px", borderRadius: "20px", marginLeft: "20px", marginRight: "600px" }}
                    />
                </Link>


                <h1 style={{ fontSize: "1.8rem", fontWeight: "bold", color: "white", flexGrow: 1 }}>
                    Akuma Shirizu
                </h1>
            </div>


            <div className="header-links" style={{ marginTop: "15px", color: "white", position: "absolute", right: "10%", display: "flex", gap: "15px" }}>
                <Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
                <Link to="/anime" style={{ color: "white", textDecoration: "none" }}>Anime</Link>
                <Link to="/manga" style={{ color: "white", textDecoration: "none" }}>Manga</Link>
                <Link to="/news" style={{ color: "white", textDecoration: "none" }}>News</Link>
                <Link to="/kids" style={{ color: "white", textDecoration: "none" }}>Kids</Link>
            </div>


            <div className="social-icons" style={{ marginTop: "10px", color: "white", marginRight: "600px" }}>
                <a href="https://x.com/AkumaShirizu" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                <a href="https://www.instagram.com/akumashirizu/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                <a href="https://bsky.app/profile/akumashirizu.bsky.social" target="_blank" rel="noopener noreferrer"><SiBluesky /></a>
                <a href="https://www.tiktok.com/@akumashirizu" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
                <a href="https://www.youtube.com/channel/UChGjMlxy7UDC1nFBosHwTTg" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
            </div>


            <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
                <FaBars size={28} />
            </button>


            <div className={`dropdown-menu ${menuOpen ? "open" : ""}`}>
                {isLoggedIn ? (
                    <>
                        <Link to="/profile"><FaUser /> My Profile</Link>
                        <button onClick={handleLogout}><FaSignOutAlt /> Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login-minor">Login as Tiny Dragon (Under 18)</Link>
                        <Link to="/login-adult">Login as Dragon (Over 18)</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>


            {showParentalWarning && <ParentalWarning onClose={() => setShowParentalWarning(false)} />}
        </header>
    );
};

export default Header;
