import {AppError, HttpCode} from "../exceptions/AppError";
import {Model} from "sequelize";
import {Brand} from "../databasemodel/dbConnection"
import {BrandController} from "../controllers/brand.controller";


export class BrandsService{
    public static async createBrand(BrandName: string): Promise<Model<any>>{
        const brand = await Brand.create({brand:BrandName});
        if(!brand){
            throw new AppError({httpCode:HttpCode.BAD_REQUEST , name: "bad request" , description: "wrong brand value "})
        }
        return brand;
    }
    public static async updateBrand(body :any , id:any):Promise<void>{
         await Brand.update({where:{id:body.id}}, {...body})
    }
}