
import React, { useState } from "react";
import { FaInstagram, FaYoutube, FaTiktok, FaBars, FaTwitter, FaUser, FaSignOutAlt } from "react-icons/fa";
import { SiBluesky } from "react-icons/si";
import { Link } from "react-router-dom";
import ParentalWarning from "./ParentalWarning";
import "../styles.css";

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMinor, setIsMinor] = useState(false);
    const [showParentalWarning, setShowParentalWarning] = useState(false);

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
        <header className="header-container">
            {/* Redes Sociales */}
            <div className="social-icons">
                <a href="https://x.com/AkumaShirizu" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                <a href="https://www.instagram.com/akumashirizu/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                <a href="https://bsky.app/profile/akumashirizu.bsky.social" target="_blank" rel="noopener noreferrer"><SiBluesky /></a>
                <a href="https://www.tiktok.com/@akumashirizu" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
                <a href="https://www.youtube.com/channel/UChGjMlxy7UDC1nFBosHwTTg" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
            </div>

            {/* Menú Hamburguesa */}
            <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
                <FaBars size={28} />
            </button>

            {/* Menú Desplegable */}
            <div className={`dropdown-menu ${menuOpen ? "open" : ""}`}>
                {isLoggedIn ? (
                    <>
                        <Link to="/profile"><FaUser /> Mi Perfil</Link>
                        <button onClick={handleLogout}><FaSignOutAlt /> Cerrar Sesión</button>
                    </>
                ) : (
                    <>
                        <Link to="/login-minor">Iniciar Sesión (Menor de 18)</Link>
                        <Link to="/login-adult">Iniciar Sesión (Mayor de 18)</Link>
                        <Link to="/register">Registrarse</Link>
                    </>
                )}
            </div>

            {/* Nombre con animación gótica */}
            <h1 className="animated-title gothic-font">Akuma Shirizu: Demons Series</h1>

            {/* Navegación */}
            <nav className={`nav-links ${isMinor ? "restricted" : ""}`}>
                <Link to="/">Home</Link>
                {!isMinor && <Link to="/anime">Anime</Link>}
                {!isMinor && <Link to="/manga">Manga</Link>}
                {!isMinor && <Link to="/news">News</Link>}
                <Link to="/kids">Kids</Link>
            </nav>

            {/* Aviso Parental */}
            {showParentalWarning && <ParentalWarning onClose={() => setShowParentalWarning(false)} />}
        </header>
    );
}

export default Header;
