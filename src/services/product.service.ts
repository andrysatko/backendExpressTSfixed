import {CreateProductDto} from "../dto/product.dto"
import {Product} from "../databasemodel/dbConnection"
import {ProductValidator} from "../validator/product.validator"
import {AppError, HttpCode} from "../exceptions/AppError";
export class ProductService {

    public static async CreateProduct(productDTO : CreateProductDto): Promise<any>{
        const ValidationResult =ProductValidator.validate(productDTO)
        const {error,warning} =  ValidationResult;
        if( error){
            throw new AppError({description: error.message+'\n'+warning?.message , name: error.name , httpCode: HttpCode.BAD_REQUEST})
        }
        return await Product.create(productDTO);
    }
}