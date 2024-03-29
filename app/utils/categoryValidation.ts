import {Request,Response,NextFunction} from 'express'
import Joi from 'joi';
import { ICategory } from '../models/Category';


export const categoryValidation = (req:Request, res: Response, next: NextFunction) => {

    // Define the Joi schema for category validation
    const CategorySchema = Joi.object<ICategory>({
    
        category_name: Joi.string(),
        category_slug: Joi.string(),
        hasChildren: Joi.boolean().optional(),
        parent: Joi.string().optional(),
        children: Joi.array().optional(),
        status:Joi.boolean().optional()
    

    }).strict();

    // Validate the category object against the schema
    const validationResult = CategorySchema.validate(req.body);

    if (validationResult.error) {
        let errMsg = ''
        validationResult.error.details.map(err => {
            errMsg += err.message;
        })
        console.error('Validation error:', validationResult.error);
        return res.status(404).json({
            success: false,
            message: errMsg
        })
    }

    next()

}



export const updateCategoryValidation = (req: Request, res: Response, next: NextFunction) => {


    interface updateCategorySchema {
        category_name: string;
        category_slug: string;
        parent: string;
        status:boolean
    
    }

    // Define the Joi schema for updateCategory validation
    const updateSchema = Joi.object<updateCategorySchema>({
        category_name: Joi.string(),
        category_slug: Joi.string(),
        status: Joi.boolean().optional(),
        parent: Joi.string().optional()
    }).strict();

    // Validate the update object against the schema
    const validationResult = updateSchema.validate(req.body);

    if (validationResult.error) {
        let errMsg = ''
        validationResult.error.details.map(err => {
            errMsg += err.message;
        })
        console.error('Validation error:', validationResult.error);
        return res.status(404).json({
            success: false,
            message: errMsg
        })
    }

    next()

}