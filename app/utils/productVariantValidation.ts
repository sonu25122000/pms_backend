import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { DisplayInFilter, IProductVariant } from "../models/ProductVariant";

export const validateProductVariant = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const productVariantSchema = Joi.object<IProductVariant>({
    product_variant: Joi.string().required().messages({
      "any.required": "Product variant is required.",
      "string.empty": "Product variant cannot be empty.",
      "string.base": "Product variant must be a string.",
    }),
    display_in_filter: Joi.string()
      .valid(DisplayInFilter.YES, DisplayInFilter.NO)
      .optional()
      .messages({
        "any.only": "Display in filter must be either YES or NO.",
      }),
    variant_type: Joi.string().required().messages({
      "any.required": "Variant type is required.",
      "string.empty": "Variant type cannot be empty.",
      "string.base": "Variant type must be a string.",
    }),
    isVisibility: Joi.boolean().optional(),
    order: Joi.number().required().messages({
      "any.required": "Order is required.",
      "number.base": "Order must be a number.",
    }),
    option_value: Joi.array()
      .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
      .optional()
      .messages({
        "array.base": "Option value must be an array.",
        "string.pattern.base":
          "Each option value must be a valid MongoDB ObjectId.",
      }),
  }).strict();

  const validationResult = productVariantSchema.validate(req.body);

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



export const validateProductVariantUpdate = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const productVariantSchema = Joi.object<IProductVariant>({
      product_variant: Joi.string().optional().messages({
        "string.empty": "Product variant cannot be empty.",
        "string.base": "Product variant must be a string.",
      }),
      display_in_filter: Joi.string()
        .valid(DisplayInFilter.YES, DisplayInFilter.NO)
        .optional()
        .messages({
          "any.only": "Display in filter must be either YES or NO.",
        }),
      variant_type: Joi.string().optional().messages({
        "any.required": "Variant type is required.",
        "string.empty": "Variant type cannot be empty.",
        "string.base": "Variant type must be a string.",
      }),
      isVisibility: Joi.boolean().optional(),
      order: Joi.number().optional().messages({
        "any.required": "Order is required.",
        "number.base": "Order must be a number.",
      }),
      option_value: Joi.array().optional()
        .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
        .messages({
          "any.required": "Option value is required.",
          "array.base": "Option value must be an array.",
          "array.empty": "Option value array cannot be empty.",
          "string.pattern.base":
            "Each option value must be a valid MongoDB ObjectId.",
        }),
    }).strict();
  
    const validationResult = productVariantSchema.validate(req.body);
  
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
  