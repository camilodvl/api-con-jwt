import Product from "../models/Product"


export const createProduct = async(req, res) => {
    const {name, category, price, imgURL}= req.body;
    const newProduct = new Product({name, category, price, imgURL})
    const productSave = await newProduct.save(); //se retorna el producto guardado
    res.status(201).json(productSave);
}

export const getProducts = async(req, res) => {
    const products = await Product.find();
    res.status(200).json(products)
}

export const getProductById = async(req, res) => {
    const product = await Product.findById(req.params.productId)
    res.status(200).json(product)

}

export const updateProductById = async(req, res) => {
    res.json('update product');
}

export const deleteProductById = async(req, res) => {
    res.json('delete product')
}