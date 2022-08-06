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

        req.userId = user._id; //creamos una variable que se va a pasar entre funciones
        console.log(req.userId)
        next();
    } catch (error) {
        res.status(501).json({ message: "Unauthorized" })
    }
}

export const verifyAdmin = async (req, res, next) => {
    //creamos un objeto con el usuario
    const user = await User.findById(req.userId);
    //retornamos un array de role con los roles que tenga el usuario
    const roles = await Role.find({_id: {$in: user.roles} })
    //recorremos el arreglo y validamos que sea admin
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name == "admin") {
            console.log(roles[i].name)
            next();
            return;
        }
    }

    return res.status(400).json({ message: "No es administrador" })

}

export const verifymoderator = async (req, res, next) => {
    //creamos un objeto con el usuario
    const user = await User.findById(req.userId);
    //retornamos un array de role con los roles que tenga el usuario
    const roles = await Role.find({_id: {$in: user.roles} })
    //recorremos el arreglo y validamos que sea admin
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name == "moderator") {
            console.log(roles[i].name)
            next();
            return;
        }
    }

    return res.status(400).json({ message: "No es moderador" })

}