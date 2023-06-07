import { Router } from 'express';
import {AuthController} from '../controllers/auth.controller'
import 'express-async-errors';

const router = Router();
router.post("/auth" , AuthController.register);
router.post("/login" , AuthController.loginAP);

export const authRouter = router;