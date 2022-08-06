import { Router } from "express";
const router = Router();
import * as productsCtrl from '../controllers/products.controller'
import {verifyToken, verifyAdmin} from '../middlewares'

router.get('/',productsCtrl.getProducts)

router.get('/:productId', productsCtrl.getProductById)

router.post('/', verifyToken, verifyAdmin, productsCtrl.createProduct)

router.delete('/:productId', verifyToken, verifyAdmin, productsCtrl.deleteProductById)

router.put('/:productId', verifyToken, verifyAdmin, productsCtrl.updateProductById)

export default router;