import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { DeliveryPartner, IsActive } from "../models/DeliveryPartner";

export const validateDevileryPartner = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const deliveryPartnerSchema = Joi.object<DeliveryPartner>({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone_number: Joi.string().required().length(10).pattern(/^\d+$/),
    country: Joi.string().required(),
    state: Joi.string().required(),
    city: Joi.string().required(),
    is_deleted: Joi.boolean().default(false),
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
        `"${fieldName}" `,
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

export const validateUpdateDeliveryPartner = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const deliveryPartnerSchema = Joi.object<DeliveryPartner>({
    name: Joi.string().required(),
    phone_number: Joi.string().required().length(10).pattern(/^\d+$/),
    country: Joi.string().required(),
    state: Joi.string().required(),
    city: Joi.string().required(),
    is_deleted: Joi.boolean().default(false),
    is_active: Joi.string()
      .valid(...Object.values(IsActive))
      .default(IsActive.Pending),
  });

  const validationResult = deliveryPartnerSchema.validate(req.body);

  if (validationResult.error) {
    const errMessage = validationResult.error.details.map(err => {
      const fieldName = err.context?.key;
      const formattedErrorMessage = err.message.replace(`"${fieldName}" `, fieldName || '');
      return formattedErrorMessage;
    });

    return res.status(400).json({
      success: false,
      error: errMessage,
    });
  }

  next();
};