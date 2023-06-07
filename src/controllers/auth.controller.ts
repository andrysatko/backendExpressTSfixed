import {Request, Response, NextFunction, ErrorRequestHandler} from "express"
import {User} from "../databasemodel/dbConnection"
import bcrypt from "bcrypt"
import {authValidator} from '../validator/auth.validator'
import jwt from 'jsonwebtoken'
import {AuthService} from "../services/auth.service";
import {AppError} from "../exceptions/AppError";


 export  class AuthController{
    public static async register(req:Request , res:Response, next:NextFunction){
        try {
            const user = await AuthService.register(req.body)
            res.json(user);
        }catch (error) {
            next(error);
        }
    }
    public static async loginAP(req : Request , res : Response , next : NextFunction) {
        try {
            const {accessToken , refreshToken} = await AuthService.login(req.body)
            if(accessToken && refreshToken){
                res.cookie('jwt' , accessToken);
                res.json({accessToken:accessToken , refreshToken:refreshToken});
            }
        }catch (error) {
            next(error)
        }

    }
 }