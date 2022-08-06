import { Router } from "express";
import * as authCtrl from '../controllers/auth.controller'
import { verifymoderator, verifyToken } from "../middlewares";
const router = Router();

router.post('/signup', authCtrl.signUp)
router.post('/signin', authCtrl.signIn)
router.get('/users', verifyToken, verifymoderator, authCtrl.listUsers)


export default router;