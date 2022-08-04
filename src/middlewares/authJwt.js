import jwt, { verify } from "jsonwebtoken";
import config from "../config";
import User from '../models/User'
import Role from "../models/Role";

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];//se recibe el token del header
        if (!token) return res.status(403).json({ "message": "No token provided" })//si no existe, retorna el mensaje

        //si existe el token, extraemos la información
        //usamos el SECRET creado en la pagina de config.js
        const decoded = jwt.verify(token, config.SECRET)

        //verificamos si existe el usuario
        const user = await User.findById(decoded.id)
        //si no existe el usuario
        if (!user) return res.status(404).json({ message: "User not exist" })

        req.userId = user._id;
        console.log(req.userId)
        next();
    } catch (error) {
        res.status(501).json({ message: "Unauthorized" })
    }
}

export const verifyAdmin = async (req, res, next) => {
    const user = await User.findById(req.userId);
    const role = await Role.findById({ $in: user.roles })
    if (role.name != "admin") return res.status(401).json({message: "no es un usuario administrador"})
    console.log("El usuario es administrador")
    next();

}