import CommonController from "./common/commonController";
import {Product} from "../databasemodel/dbConnection";
import {NextFunction, Request,Response} from "express";
import {ProductService} from "../services/product.service"
import * as uuid from 'uuid';
import path from "path";
import {ImageService} from "../services/image.service";
class productController extends CommonController<typeof Product>{
    constructor(model: typeof Product) {
        super(model);
    }

    public async CreateProduct(req:Request , res: Response , next :NextFunction){
        try {
                const [fileName,Full_PAth] = await ImageService.setImg(req.files?.img)
                res.sendFile(Full_PAth,{headers:{...await ProductService.CreateProduct({...req.body,img: fileName})}});
        }catch (e)  {
            next(e)
        }
    }
}

export const ProductController = new productController(Product);