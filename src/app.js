import express from 'express'
import morgan from 'morgan'
import pkg from '../package.json'
import productsRoutes from './routes/products.routes' //se importa el router como productsRoutes

const app = express()
app.set('pkg', pkg)

app.use(express.json()) //middleware para recibir el formato json
app.use(morgan('dev'));//muestra informacion en la consola sobre las consultas

app.get('/', (req, res)=>{
    res.json({
        name: app.get('pkg').name,
        descripcion: app.get('pkg').description,
        version:"1.0.0"
    })
})

app.use('/products',productsRoutes); //se usan las rutas importadas de productsRoutes

export default app;