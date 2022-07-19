import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        ref: "Role",
        type: Schema.Types.ObjectId
    }]//un arreglo de objetos
}, {
    timestamps: true,
    versionKey: false
})

export default model("User", userSchema)