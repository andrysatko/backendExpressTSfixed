import { Router } from 'express';
import 'express-async-errors';
import {BrandsService} from "../services/brands.service"
import brandAttributes from "../databasemodel/attributes/brandAttributes";
import {BrandController} from "../controllers/brand.controller"
const router = Router();
router.get("/brand" , BrandController.getAll);
router.post("/brand" , BrandController.createBrand);
router.put("/updateBrand" , BrandController.updateBrand)

export const brandRouter = router;