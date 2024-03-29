import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express'
import VariantOption, { variantOptionDocument } from '../models/VariantOption';

export const validateVariantOption = (req: Request, res: Response, next: NextFunction) => {

    // Define the Joi schema for VariantOption validation
    const variantOptionSchama = Joi.object<variantOptionDocument>({
        value: Joi.string().required().messages({'any.required':"value is required"}),
        order: Joi.number().required().min(1).messages({
            'number.min': 'Order number must be at least 1',
            'any.required':'Order Number must be required'
        })
       
    }).strict();

    // Validate the user object against the schema
    const validationResult = variantOptionSchama.validate(req.body);

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



export const validateVariantOptionUpdate = (req: Request, res: Response, next: NextFunction) => {

    // Define the Joi schema for VariantOption validation
    const variantOptionSchama = Joi.object<variantOptionDocument>({
        value: Joi.string().optional().messages({'any.required':"value is required"}),
        order: Joi.number().optional().min(1).messages({
            'number.min': 'Order number must be at least 1',
            'any.required':'Order Number must be required'
        })
        
    }).strict();

    // Validate the user object against the schema
    const validationResult = variantOptionSchama.validate(req.body);

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