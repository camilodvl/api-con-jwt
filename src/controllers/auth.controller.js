import User from "../models/User";
import jwt from "jsonwebtoken";
import config from '../config'
import Role from "../models/Role";

export const signUp = async (req, res) => {
  const { username, email, password, roles } = req.body;

  const newUser = new User({
    username,
    email,
    password: await User.encryptPassword(password) //se encripta el password recibido con la funcion creada en el modelo
  });

  if (roles) {
    const foundRoles = await Role.find({ name: { $in: roles } })//retorna todos los roles que encuentre en un objeto
    newUser.roles = foundRoles.map(role => role.id)//va a mapear solo el id
  } else {
    const role = await Role.findOne({ name: "user" })
    newUser.roles = [role.id]; //si no ingresaron roles, por defecto asigna el de usuario
  }

  const savedUser = await newUser.save();
  //sel jwt.sign recibe el dato del usuario que se va a almacenar, palabra secreta para crear el token
  // y un objeto de configuración (el objeto de configuracion está en config.js)
  console.log(savedUser)
  const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
    expiresIn: 86400//expiracion en segundos
  })

  res.json({ "token": token });

};

export const signIn = async (req, res) => {
  res.json("signin");
};
