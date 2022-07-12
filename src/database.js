import mongoose from "mongoose";

const getConnection = async() =>{
    try{

    await mongoose.connect('mongodb://userbd:otXhM4RolaOxGcBG@cluster0-shard-00-00.hgkh4.mongodb.net:27017,cluster0-shard-00-01.hgkh4.mongodb.net:27017,cluster0-shard-00-02.hgkh4.mongodb.net:27017/api-jwt?ssl=true&replicaSet=atlas-mg7654-shard-0&authSource=admin&retryWrites=true&w=majority')
    console.log(`Conexión establecida a la base de datos`);
}catch(error) {
    console.log(`Error de conexión a la BD: ${error}`)
}

}
module.exports={getConnection};