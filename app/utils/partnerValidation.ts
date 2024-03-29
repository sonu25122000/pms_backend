import * as Joi from "joi";
import { Request, Response, NextFunction } from "express";

export const partnerInputValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const partnerValidation = Joi.object({
    userType: Joi.string().required().messages({
      "any.required": "User type is required",
      "string.empty": "User type cannot be empty",
    }),
    name: Joi.string().required().messages({
      "any.required": "Name is required",
      "string.empty": "Name cannot be empty",
    }),
    email: Joi.string().required().messages({
      "any.required": "Email is required",
      "string.empty": "Email cannot be empty",
    }),
    city: Joi.string().required().messages({
      "any.required": "City is required",
      "string.empty": "City cannot be empty",
    }),
    state: Joi.string().required().messages({
      "any.required": "State is required",
      "string.empty": "State cannot be empty",
    }),
  }).strict();

  const validationResult = partnerValidation.validate(req.body);

  if (validationResult.error) {
    let errMsg = "";
    validationResult.error.details.map((err) => {
      errMsg += err.message;
    });
    console.error("Validation error:", validationResult.error);
    return res.status(404).json({
      success: false,
      message: errMsg,
    });
  }
  next();
};
