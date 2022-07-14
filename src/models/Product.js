import { Schema, model } from "mongoose";

const productSchema = new Schema({
    name: String,
    category: String,
    price: Number,
    imgURL: String
}, {
    timestamps: true,//para los campos de fecha de actualizacion y creacion
    versionKey: false //para que el registro no tenga el campo de version
})

export default model('Product', productSchema)//se exporta el modelo