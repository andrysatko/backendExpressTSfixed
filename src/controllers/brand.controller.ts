import CommonController from "./common/commonController";
import {Brand} from "../databasemodel/dbConnection"
import {Response, Request ,NextFunction} from "express";
import {BrandsService} from "../services/brands.service";
class brandController extends CommonController<typeof Brand>{
    constructor(model: typeof Brand) {
        super(model);
    }
    async createBrand(req: Request , res: Response , next : NextFunction){
        try {
            const newBrand = await BrandsService.createBrand(req.body.brand)
            res.json(newBrand)
        }catch (e) {
            next(e)
        }
    }
    async updateBrand(req: Request , res: Response, next: NextFunction){
        try {
            const Updated = await BrandsService.updateBrand(req.body , req.query.id)
            res.json(Updated);
        }catch (e) {
            next(e);
        }
    }
}
export const BrandController  = new brandController(Brand);