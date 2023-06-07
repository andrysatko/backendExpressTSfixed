import {User} from "../databasemodel/dbConnection";
import {AuthDTO} from "../dto/uset.dto";
import {AppError, HttpCode} from "../exceptions/AppError";

export class userService {
    public static async update(dto: Partial<AuthDTO>, email:string ):Promise<void>{

         const update = await User.update({...dto} ,{where: <typeof dto>{email:email}});
         if(!update){
             throw  new AppError({httpCode: HttpCode.NOT_FOUND , name: "Bad request" , description: "check update signature"})
         }
    }
}
