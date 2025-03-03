
import jwt from "jsonwebtoken";

export const validarJWT = (req, res, next) => {

    const token = req.header("x-token");
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "No se encontró token en la petición"
        });
    }

    try {

        const { id, rol } = jwt.verify(token, process.env.JWT_SECRET);

        req.uid = id;
        req.rol = rol;
        next();
    } catch (error) {
        console.error("Error al verificar el token:", error);
        return res.status(401).json({
            success: false,
            message: "Token no válido"
        });
    }
};
