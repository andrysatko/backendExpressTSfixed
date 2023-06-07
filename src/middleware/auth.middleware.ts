import jwt from 'jsonwebtoken'
import {User} from "../databasemodel/dbConnection"
import {Request,NextFunction, Response} from "express";
import {AppError} from "../exceptions/AppError";
import {type} from "os";
import {string} from "joi";

export let AuthMiddleware = (req:Request , res:Response , next:NextFunction )=>{
        let token:string | undefined = <any>req.cookies.jwt?? undefined;
        let secretKey:string | undefined = process.env.SECRETJWT?? undefined;
        if(  token  && secretKey) {
            const Verify = jwt.verify(token, secretKey, {});
            next()
                return
        }
        if(typeof secretKey == "undefined"){
                res.status(404).json({message: 'error'})
                throw new Error('variable SECRETJWT not found in .env file ');
        }
        else {
                res.status(404).json({message: 'unuthorized'})
                throw  new Error('empty token');
        }
}
