import { Router } from 'express';
import {ProductController} from "../controllers/product.controller";
const router = Router();
router.get("/products" , ProductController.getAll);
router.post("/product" , ProductController.CreateProduct);
export const productRouter = router;