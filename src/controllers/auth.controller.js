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
    console.log(newUser.roles);
  } else {
    const role = await Role.findOne({ name: "user" })
    newUser.roles = [role.id]; //si no ingresaron roles, por defecto asigna el de usuario
  }

  const savedUser = await newUser.save();
  //sel jwt.sign recibe el dato del usuario que se va a almacenar, palabra secreta para crear el token
  // y un objeto de configuración (el objeto de configuracion está en config.js)
  console.log(savedUser)
  const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
    expiresIn: 86400//expiracion en segundosa¿
  })

  res.json({ "token": token });

};


export const signIn = async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  const userFound = await User.findOne({ email: email }).populate("roles");
  //si el objeto existe

  if (!userFound) return res.status(400).json({ message: "User not found" })

  //comparamos clave enviada, con la almacenada
  const matchPassword = await User.comparePassword(req.body.password, userFound.password)
  if (!matchPassword) return res.status(401).json({ token: null, message: "Pass not" })


  //si todo es correcto, retornamos el token
  const token = jwt.sign({ id: userFound._id }, config.SECRET, {
    expiresIn: 86400
  })

  console.log(userFound)
  res.json({ token })


};


export const listUsers = async (req,res)=>{
  const users = await User.find()
  res.status(200).json(users)
}
