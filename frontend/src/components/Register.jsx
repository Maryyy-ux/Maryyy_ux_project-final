import React, { useState } from "react";
import axios from "axios";
import "./Register.css";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [message, setMessage] = useState("");

    const handleImageChange = (e) => {
        setProfileImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (age < 18) {
            alert("Registro exitoso. Accederás a contenido apto para menores.");
        } else {
            alert("Registro exitoso. Accederás a todo el contenido.");
        }


        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        formData.append("age", age);
        formData.append("profileImage", profileImage);

        try {

            const response = await axios.post(
                "http://localhost:8080/auth/register",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );


            setMessage(response.data.message);
        } catch (error) {
            setMessage("Error al registrar usuario");
            console.error("Error en el registro:", error);
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
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
                <input
                    type="number"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Register;
