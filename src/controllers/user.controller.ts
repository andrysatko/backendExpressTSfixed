import CommonController from "./common/commonController"
import {User} from "../databasemodel/dbConnection";
import {NextFunction, Request, Response} from "express";
import {userService} from "../services/user.service";
import * as uuid from 'uuid';
import path from 'path';
import jwt from "jsonwebtoken";
import {AppError, HttpCode} from "../exceptions/AppError";


class UserController extends CommonController<typeof User>{
    constructor( user : typeof User ) {
        super(user);
    }

    public async update(req:Request , res: Response, next: NextFunction){
        try {
          await  userService.update(req.body , req.query.id as string);
          res.json({"success": "true"})
        }
        catch (error) {
            next(error)
        }
    }
    public async setImg(req:Request , res: Response , next: NextFunction){
        try {
            const token:string = <any>req.cookies?.jwt;
            const user:any = jwt.decode(token);
            const  img   = req.files?.img;
            const uuidFileName:string = uuid.v4();
            if (!img) return res.sendStatus(400);
            if ("mv" in img) {
                const Full_PAth: string = path.join(__dirname, '/../..','/src' , '/static/' , uuidFileName + '.'+img.name.split('.').pop());
                await userService.update({imgLink:"'"+ Full_PAth+"'"} ,user.email);
                await img.mv(Full_PAth);
                res.sendStatus(201);
            }
            res.sendStatus(200);
        }catch (error) {
            console.log(error)
            next(error)
        }
    }
    public async getImg(req: Request , res:Response , next: NextFunction){
        try {
            const user:any = await User.findOne({where:{id:req.query.userId}})
            if(!user){
                throw  new AppError({name: "not found" , description: `User with id ${req.query.userId} wasn't fond` , httpCode:HttpCode.NOT_FOUND , isOperational:true})
            }
            res.sendFile(user.imgLink)
        }catch (e) {
                next(e)
        }
    }
}
export const userController =  new UserController(User);




