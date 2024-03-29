import * as Joi from "joi";
import { Request, Response, NextFunction } from "express";
export const validateUserInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  enum UserRole {
    VENDOR = "Vendor",
    DELIVERY_PARTNER = "Delivery Partner",
  }

  interface User {
    email: string;
    username: string;
    password: string;
    role?: UserRole | null;
  }

  // Define the Joi schema for user validation
  const userSchema = Joi.object<User>({
    email: Joi.string().email().required().messages({
      "string.email": "Please enter a valid email address.",
      "any.required": "Email is required.",
    }),
    username: Joi.string().alphanum().min(3).max(30).required().messages({
      "string.alphanum":
        "Username should only contain alphanumeric characters.",
      "string.min": "Username must be at least {#limit} characters long.",
      "string.max": "Username cannot be longer than {#limit} characters.",
      "any.required": "Username is required.",
    }),
    password: Joi.string()
      .pattern(
        new RegExp("^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};:'\",.<>/?]{3,30}$")
      )
      .required()
      .messages({
        "string.pattern.base":
          "Password must contain  alphanumeric characters symbols and be between 3 and 30 characters long.",
        "any.required": "Password is required.",
      }),
    role: Joi.string()
      .valid(...Object.values(UserRole))
      .optional(),
  }).strict();

  // Validate the user object against the schema
  const validationResult = userSchema.validate(req.body);

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
