import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const users = [];

export const register = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;
        const rol = "ADMIN";

        const usuarioExistente = users.find(user => user.email === email);
        if (usuarioExistente) {
            return res.status(400).json({ success: false, message: "El correo ya está registrado" });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const nuevoUsuario = { id: users.length + 1, nombre, email, password: passwordHash, rol };
        users.push(nuevoUsuario);

        res.status(201).json({ success: true, message: "Usuario registrado exitosamente", usuario: nuevoUsuario });
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        res.status(500).json({ success: false, message: "Error interno del servidor" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const usuario = users.find(user => user.email === email);
        if (!usuario) {
            return res.status(400).json({ success: false, message: "Correo o contraseña incorrectos" });
        }

        const passwordValido = await bcrypt.compare(password, usuario.password);
        if (!passwordValido) {
            return res.status(400).json({ success: false, message: "Correo o contraseña incorrectos" });
        }

        if (usuario.rol !== "ADMIN") {
            return res.status(403).json({ success: false, message: "Acceso restringido: solo administradores" });
        }

        const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, process.env.JWT_SECRET, { expiresIn: "15d" });

        res.json({ success: true, token, message: "Inicio de sesión exitoso" });
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ success: false, message: "Error interno del servidor" });
    }
};
