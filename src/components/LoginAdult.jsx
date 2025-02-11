import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const LoginAdult = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showLogoutImage, setShowLogoutImage] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("token", data.token); // Guardamos el token
                alert("Correct login");

                // Redirigir según la edad
                data.age >= 18 ? navigate("/home") : navigate("/kids");
            } else {
                alert(data.error);
            }
        } catch (error) {
            alert("Login error");
        }
    };

    const handleLogout = () => {
        setShowLogoutImage(true);
        setTimeout(() => {
            setShowLogoutImage(false);
            navigate("/"); // Volver a la página principal
        }, 3000);
    };

    return (
        <div className="login-container adult">
            {showLogoutImage ? (
                <img src="/login-adult.jpg" alt="Logout Adulto" className="logout-image" />
            ) : (
                <div className="login-box">
                    <h2>Login (Adult)</h2>
                    <form onSubmit={handleLogin}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit" className="btn-login">Login</button>
                    </form>
                    <button onClick={handleLogout} className="btn-logout">Logout</button>
                </div>
            )}
        </div>
    );
};

export default LoginAdult;
