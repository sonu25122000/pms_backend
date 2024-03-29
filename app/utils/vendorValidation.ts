import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { IsActive, VendorDocument } from "../models/Vendor";

export const validateVendorInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const deliveryPartnerSchema = Joi.object<VendorDocument>({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone_number: Joi.string().required().length(10).pattern(/^\d+$/),
    country: Joi.string().required(),
    state: Joi.string().required(),
    city: Joi.string().required(),
    isDeleted: Joi.boolean().default(false),
    is_active: Joi.string()
      .valid(...Object.values(IsActive))
      .default(IsActive.Pending),
  });

  // Validate the user object against the schema
  const validationResult = deliveryPartnerSchema.validate(req.body);

  if (validationResult.error) {
    let errMessage = validationResult.error.details.map((err) => {
      const errorMessage = err.message;
      const fieldName: string | undefined = err.context?.key;
      const formattedErrorMessage = errorMessage.replace(
        `"${fieldName}"`,
        fieldName as string
      );

      return formattedErrorMessage;
    });

    return res.status(400).json({
      success: false,
      error: errMessage,
    });
  }

  next();
};



export const validateVendorInputForUpdate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const VendorSchema = Joi.object<VendorDocument>({
    name: Joi.string().optional(),
    phone_number: Joi.string().optional().length(10).pattern(/^\d+$/),
    country: Joi.string().optional(),
    state: Joi.string().optional(),
    city: Joi.string().optional(),
   
  });

  // Validate the user object against the schema
  const validationResult = VendorSchema.validate(req.body);

  if (validationResult.error) {
    let errMessage = validationResult.error.details.map((err) => {
      const errorMessage = err.message;
      const fieldName: string | undefined = err.context?.key;
      const formattedErrorMessage = errorMessage.replace(
        `"${fieldName}"`,
        fieldName as string
      );

      return formattedErrorMessage;
    });

    return res.status(400).json({
      success: false,
      error: errMessage,
    });
  }

  next();
};
