import {Model, ModelStatic} from 'sequelize';
import {Request,Response,NextFunction} from "express";
import { AppError, HttpCode } from '../../exceptions/AppError';

type handler = (req: Request, res: Response , next:NextFunction)=> Promise<void>;
export interface ICommonController {
    getAll: handler,
    findOne: handler,
    delete: handler,
    findAnPaginate: handler
}
export default  class CommonController<Attributes extends ModelStatic<Model>> implements ICommonController{
    public model: Attributes;
    _dto? : Object;
    constructor( model: Attributes )
    constructor(model: Attributes , dto?: Object)
    {
         this.model = model;
         this.getAll = this.getAll.bind(this);
         this.delete = this.delete.bind(this);
         this.findAnPaginate = this.findAnPaginate.bind(this);
         this.findOne = this.findAnPaginate.bind(this);
         this._dto = dto ?? {};
    }
    public async getAll(req: Request, res: Response , next:NextFunction){
        try {
            const entity = await  this.model.findAll();
            res.status(200).json(entity);
        }catch (error:any) {
            res.status(500).json({message: error.message}) //validation error
            next(error);
        }
    }
    public async delete(req: Request, res: Response , next:NextFunction){
        try{
            //must be validation that user is admin
            const data = req.body
            const entity = this.model.findOne(data)
            await this.model.destroy({where:{...data}})
            res.status(200).json({message:"successfully deleted"})
        } catch (error:any) {
            res.status(500).json({message: error.message}) //validation error
            next(error)
        }
    }
    public  async findOne(req: Request, res: Response , next:NextFunction){
       try {
           const models = await  this.model.findOne(req.body);
           res.status(200).json(models);
       }catch (error: any) {
           if(error instanceof Error){
               res.status(404).json({message: error.message})
               next(error);
           }
           console.log(error);
       }
    }
    public  async findAnPaginate(req: Request, res: Response , next:NextFunction){
        try {
            const {limit , offset , where} = req.body
            const paginated = await this.model.findAndCountAll({where,offset,limit});
            res.status(200).json(paginated);
        }catch (error:any) {
            res.status(500).json({message: error.message}) //validation error
            next();
        }
    }
}


