import { Router } from 'express';
import {AuthController} from '../controllers/auth.controller'
import 'express-async-errors';
import { AuthMiddleware} from "../middleware/auth.middleware"
import {userController} from "../controllers/user.controller";

const router: Router = Router();
router.use(AuthMiddleware)
router.get("/users" , userController.getAll);
router.get("/user:id" , userController.findOne);
router.post("/user/test" ,userController.update );
router.post("/user/img" ,userController.setImg );
router.get("/user/img" ,userController.getImg );

export const userRouter = router;