import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [formData, setFormData] = useState({ username: "", email: "", password: "", age: "", profileImage: null });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, profileImage: e.target.files[0] });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const formDataObj = new FormData();
        Object.entries(formData).forEach(([key, value]) => formDataObj.append(key, value));

        try {
            const response = await fetch("http://localhost:8080/auth/register", {
                method: "POST",
                body: formDataObj
            });

            const data = await response.json();
            if (response.ok) {
                alert("Registro exitoso.");
                navigate("/");
            } else {
                alert(data.error);
            }
        } catch (error) {
            alert("Error en el registro.");
        }
    };

    return (
        <div className="signup-container">
            <h2>Registro</h2>
            <form onSubmit={handleSignup}>
                <input type="text" name="username" placeholder="Usuario" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Correo" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
                <input type="number" name="age" placeholder="Edad" onChange={handleChange} required />
                <input type="file" name="profileImage" accept="image/*" onChange={handleFileChange} />
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
};

export default Signup;
