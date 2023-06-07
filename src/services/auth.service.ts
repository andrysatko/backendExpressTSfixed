import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {TokenTypeEnum} from "../dto/tokenTypeEnum";
import {User} from "../databasemodel/dbConnection"
import {Model} from "sequelize";
import {authValidator} from "../validator/auth.validator";
import {AppError, HttpCode} from "../exceptions/AppError";
import {AuthDTO, LoginDto} from "../dto/uset.dto";

export class AuthService {
     static readonly hash_Salt = 10;
     static readonly AccessKey = process.env.SECRETJWT?? 'Optional'
     static readonly RefreshKey = process.env.SECRETJWT?? 'Secret'

    public static hashPassword(password : string ):string{
        return bcrypt.hashSync(password , AuthService.hash_Salt )
    }
    public static async comparePassword(hashPassword: string, password: string): Promise<boolean> {
        return await bcrypt.compare(password, hashPassword);
    }
    public static async generateJWTToken<T extends Object>(payload:T):Promise<{accessToken: string, refreshToken: string}>{
        return {accessToken: jwt.sign(payload , AuthService.AccessKey , {expiresIn: '1d'}),refreshToken: jwt.sign(payload , this.AccessKey , {expiresIn: '10d'})};
    }
    public static async verifyToken(token:string , tokenType : TokenTypeEnum = TokenTypeEnum.accessToken):Promise<string> {
        return   jwt.verify(token, token == TokenTypeEnum.refreshToken ? this.RefreshKey :this.AccessKey ) as string
    }
    public static async register(body: AuthDTO):Promise<Model<any>>{
        const result = authValidator.validate(body)
        const {value , error, warning} = result;
        if (error){
            throw new AppError({isOperational:false , name:" Bad Request" , description:error.message ,httpCode:HttpCode.BAD_REQUEST})
        }
        return await User.create({...body, password: AuthService.hashPassword(body.password)});
    }
    public static async login(body: LoginDto):Promise<{accessToken:string , refreshToken:string}>{
         const user= await User.findOne({where:{email:body.email}}) as unknown as AuthDTO;
         if(await this.comparePassword(user.password , body.password)){
             return  await this.generateJWTToken({email: user.email , firstname : user.firstName , lastname : user.lastname });
         }
         else throw new AppError({httpCode:HttpCode.BAD_REQUEST ,name:"Bad request" , description:"Incorrect data received . Make sure that your password or email correct " , isOperational:true})
    }
}