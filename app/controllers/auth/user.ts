// authController.ts
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User, { UserRole } from "../../models/User";
import { Error } from "mongoose";
import { generateToken, verifyToken } from "../../services/jwtService";
import { USER_JWT_SECRET } from "../../config";
import { sendResetEmail } from "../../services/sendMail";
import jwt from "jsonwebtoken";
import { resetPasswordTemplate } from "../../utils/emailTemplate";
import { DeliveryPartnerModel } from "../../models/DeliveryPartner";
import Vendor from "../../models/Vendor";

// export const register = async (req: Request, res: Response) => {
//   // Handle User registration
//   const { username, email, password } = req.body;

//   try {
//     // Check if User already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({
//         success: false,
//         message: "User already exists",
//       });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new User
//     const newUser = new User({
//       username,
//       email,
//       password: hashedPassword,
//     });

//     await newUser.save();

//     return res.status(201).json({
//       success: true,
//       message: "User registered successfully",
//       userId: newUser._id,
//     });
//   } catch (error) {
//     console.error("Error in user registration:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

export const login = async (req: Request, res: Response) => {
  // Handle user login
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify password
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = generateToken(user._id, USER_JWT_SECRET);

    const role = user.role;

    if (role == UserRole.DELIVERY_PARTNER) {
      const partner = await DeliveryPartnerModel.find({ email });
      return res.status(200).json({
        status: "success",
        message: "Login successful",
        token,
        data: partner,
      });
    }
    if (role == UserRole.VENDOR) {
      const partner = await Vendor.find({ email });
      return res.status(200).json({
        status: "success",
        message: "Login successful",
        token,
        data: partner,
      });
    }

    // Return JWT token or other authentication response
  } catch (error) {
    console.error("Error in user login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const user = await User.find();
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user Exist",
        data: null,
      });
    }
    return res.status(200).json({
      success: true,
      message: "list of user",
      data: user,
    });
  } catch (error) {
    console.error("Error in user login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const { userId } = req.body.user;
    // Find user by email
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Verify current password
    const passwordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!passwordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid current password",
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    // Update user's password in the database
    user.password = hashedPassword;
    await user.save();

    // Send success response
    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Error changing password:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to change password",
    });
  }
};

export const forgetPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(404).json({
      success: false,
      message: "BAD REQUEST Enter your email",
    });
  }
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Generate reset token
    const resetToken = generateToken(user._id, USER_JWT_SECRET);

    // Update user record with reset token
    user.resetToken = resetToken;
    await user.save();

    // Send response immediately
    res.status(200).json({
      success: true,
      message: "Please check your email",
    });

    // Send password reset email in background
    sendResetEmail(
      user.email,
      resetPasswordTemplate(resetToken),
      "Password Reset Instructions"
    );
  } catch (error) {
    console.error("Error initiating password reset:", error);
    res.status(500).json({
      success: false,
      message: "Failed to initiate password reset",
    });
  }
};

export const confirmPassword = async (req: Request, res: Response) => {
  const { newPassword } = req.body;
  const token: string = req.query.token as string;

  if (!newPassword || !token) {
    return res.status(400).json({
      success: false,
      message: "BAD REQUEST | newPassword or token not found",
    });
  }

  try {
    // Find user by reset token
    const user = await User.findOne({ resetToken: token });
    const isVerifiedToken = verifyToken(token, USER_JWT_SECRET);
    if (!user || !isVerifiedToken) {
      return res.status(400).json({
        success: false,
        message: "Invalid reset token",
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user record with new hashed password and clear reset token
    user.password = hashedPassword;
    user.resetToken = null;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({
      success: false,
      message: "Failed to reset password",
    });
  }
};
