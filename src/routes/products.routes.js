import { Router } from "express";
const router = Router();
import * as productsCtrl from '../controllers/products.controller'
import {verifyToken} from '../middlewares'

router.get('/',productsCtrl.getProducts)

router.get('/:productId', productsCtrl.getProductById)

router.post('/', verifyToken, productsCtrl.createProduct)

router.delete('/:productId', verifyToken, productsCtrl.deleteProductById)

router.put('/:productId', verifyToken, productsCtrl.updateProductById)

export default router;