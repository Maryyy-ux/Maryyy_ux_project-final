import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Configurar almacenamiento de imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// **Registro**
router.post("/register", upload.single("profileImage"), async (req, res) => {
    try {
        const { username, email, password, age } = req.body;

        // Validación de datos
        if (!username || !email || !password || !age) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const profileImage = req.file ? `/uploads/${req.file.filename}` : null;

        const newUser = new User({ username, email, password: hashedPassword, age, profileImage });
        await newUser.save();

        res.status(201).json({ message: "Usuario registrado con éxito" });
    } catch (error) {
        console.error(error); // Agregar el log del error
        res.status(500).json({ error: "Error al registrar usuario" });
    }
});

// **Login**
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Por favor ingresa el email y la contraseña" });
        }

        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Credenciales incorrectas" });
        }

        const token = jwt.sign({ userId: user._id, age: user.age }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ message: "Inicio de sesión exitoso", token, age: user.age });
    } catch (error) {
        console.error(error); // Agregar el log del error
        res.status(500).json({ error: "Error al iniciar sesión" });
    }
});

// **Ruta protegida de ejemplo**
router.get("/profile", async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Extrae el token del header 'Authorization'

        if (!token) {
            return res.status(403).json({ error: "Acceso denegado, token no proporcionado" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verificar el token

        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.json({ username: user.username, email: user.email, age: user.age, profileImage: user.profileImage });
    } catch (error) {
        console.error(error); // Agregar el log del error
        res.status(500).json({ error: "Error al obtener perfil" });
    }
});

export default router;
