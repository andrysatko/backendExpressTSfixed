import {NextFunction, Response, Request} from "express";
import {AppError} from "../exceptions/AppError";

export const errorMiddleware = (err:any,req: Request , res:Response , next : NextFunction)=>{
    console.log(err)
    if(err instanceof AppError){
        return res.status(err.httpCode).json({type:err.name, message:err.message , isOperational:err.isOperational})
    }
    else{ return res.status(400).json({message:'Unexpected error'})}
}