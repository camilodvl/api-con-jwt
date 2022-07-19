import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: [
      {
        ref: "Role",
        type: Schema.Types.ObjectId,
      },
    ], //un arreglo de objetos
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.statics.encryptPassword= async (password) => {
    const salt = await bcrypt.genSalt(10);//genera 10 saltos para encriptar el algoritmo
    return await bcrypt.hash(password, salt)//retorna la contraseña cifrada
}

userSchema.statics.comparePassword= async (passsword, receivedPasswords) => {
    return await bcrypt.compare(passsword, receivedPasswords); //retora true si ambas coinciden
}

export default model("User", userSchema);
