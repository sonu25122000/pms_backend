import Joi from "joi";
import { Request, Response, NextFunction } from "express";

// Define Joi schema for brand input validation
export const brandSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Brand name cannot be empty",
    "any.required": "Brand name is required",
  }),
  description: Joi.string().required().messages({
    "string.empty": "Description cannot be empty",
    "any.required": "Description is required",
  }),
  isVisible: Joi.boolean().default(true).optional().messages({
    "boolean.base": "Visibility status must be true or false",
  }),
});

// Middleware to validate brand input
export const validateBrandInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Validate the request body against the schema
  const validationResult = brandSchema.validate(req.body);

  // If validation fails, return error response
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

  // If validation passes, proceed to the next middleware
  next();
};
