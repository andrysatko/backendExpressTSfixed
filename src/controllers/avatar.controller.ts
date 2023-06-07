import {Response, Request, NextFunction} from "express";
import {User} from "../databasemodel/dbConnection"
import uuid from "uuid"
export class AvatarController {
    constructor() {
    }
    public static async addAvatar(req:Request , res: Response , next: NextFunction){
        const file = req.body.file;
        const user =await User.findOne({where: {id:req.params}});
        if (user){
            await user.update({imgLn : "fdsaa"} , {where:{id:1}})
        }
    }
}