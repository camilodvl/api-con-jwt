import { Router } from "express";
const router = Router();
import * as productsCtrl from '../controllers/products.controller'

router.get('/', productsCtrl.getProducts)

router.get('/:productId', productsCtrl.getroductById)

router.post('/', productsCtrl.createProduct)

router.delete('/:productId', productsCtrl.deleteProductById)

router.put('/:productId', productsCtrl.updateProductById)

export default router;