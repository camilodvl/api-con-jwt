import User from "../models/User";
import jwt from "jsonwebtoken";
import config from '../config'

export const signUp = async (req, res) => {
  const { username, email, password, roles } = req.body;

  const newUser = new User({
    username,
    email,
    password: await User.encryptPassword(password) //se encripta el password recibido con la funcion creada en el modelo
  });
  const savedUser = await newUser.save();
  //sel jwt.sign recibe el dato del usuario que se va a almacenar, palabra secreta para crear el token
  // y un objeto de configuración

  const token = jwt.sign({id: savedUser._id},config.SECRET , {
    expiresIn: 86400//expiracion en segundos
  })

  res.json({"token": token});

};

export const signIn = async (req, res) => {
  res.json("signin");
};
