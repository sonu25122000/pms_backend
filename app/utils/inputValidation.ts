import * as Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { UserRole } from "../models/User";
import passwordComplexity from "joi-password-complexity";
export const validateUserInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

export const passwordValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Define the Joi schema for currentPassword and newPassword validation
  const passwordSchema = Joi.object({
    currentPassword: Joi.string().required().messages({
      "string.required": "Current password is required.",
    }),
    newPassword: passwordComplexity().required(),
  }).strict();

  // Validate the user object against the schema
  const validationResult = passwordSchema.validate(req.body);

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

    // Remove the field name from the error message

    // Send the formatted error message
    return res.status(400).json({
      success: false,
      error: errMessage,
    });
  }

  next();
};
