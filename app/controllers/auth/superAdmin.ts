// authController.ts
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import SuperAdmin from "../../models/SuperAdmin";
import { generateToken, verifyToken } from "../../services/jwtService";
import { SUPERUSER_JWT_SECRET } from "../../config";
import { sendResetEmail } from "../../services/sendMail";
import { resetPasswordTemplate } from "../../utils/emailTemplate";

export const register = async (req: Request, res: Response) => {
  // Handle superAdmin registration
  const { firstName, lastName, username, email, password } = req.body;

  try {
    // Check if superAdmin already exists
    const existingAdmin = await SuperAdmin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new superAdmin
    const newSuperAdmin = new SuperAdmin({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
    });

    await newSuperAdmin.save();

    return res
      .status(201)
      .json({ message: "SuperAdmin registered successfully" });
  } catch (error: any) {
    console.error("Error in user registration:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", data: null });
  }
};

export const login = async (req: Request, res: Response) => {
  // Handle user login
  const { email, password } = req.body;

  try {
    // Find superUser by email
    const superUser = await SuperAdmin.findOne({ email });
    if (!superUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found", data: null });
    }

    // Verify password
    if (!(await bcrypt.compare(password, superUser.password))) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password", data: null });
    }
    const token = generateToken(superUser._id, SUPERUSER_JWT_SECRET);

    // Return JWT token or other authentication response
    return res
      .status(200)
      .json({ success: true, message: "Login successful", token });
  } catch (error) {
    console.error("Error in user login:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", data: null });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const { userId } = req.body.user;
    // Find user by userID
    const superUser = await SuperAdmin.findOne({ _id: userId });
    if (!superUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found", data: null });
    }
    // Verify current password
    const isPasswordMatch = await bcrypt.compare(
      currentPassword,
      superUser.password
    );

    // if current password not matched return
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid current password",
      });
    }
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password in the database
    superUser.password = hashedPassword;

    // save superuser data with latest hashed password
    await superUser.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
      data: superUser,
    });
  } catch (error) {
    console.error("Error changing password:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    // Find user by email
    const superUser = await SuperAdmin.findOne({ email });

    // if superUser not found return
    if (!superUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found", data: null });
    }
    // Generate reset token by using superUser jwt Secret
    const resetToken = generateToken(superUser._id, SUPERUSER_JWT_SECRET);

    // Update superUser record with reset token
    superUser.resetToken = resetToken;
    await superUser.save();

    // Send response immediately
    res
      .status(200)
      .json({ success: true, message: "Please check your email", data: null });

    // Send password reset email in background
    sendResetEmail(superUser.email,resetPasswordTemplate(resetToken),"Password Reset Instructions");
  } catch (error) {
    console.error("Error initiating password reset:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: null,
    });
  }
};

export const confirmPassword = async (req: Request, res: Response) => {
  const { newPassword } = req.body;

  // get the token as params
  const token: string = req.query.token as string;

  try {
    // Find user by reset token
    const superUser = await SuperAdmin.findOne({ resetToken: token });

    // verify the token, expiry
    const isVerifiedToken = verifyToken(token, SUPERUSER_JWT_SECRET);

    // if superUser not found or reset token is inValid or expired return
    if (!superUser || !isVerifiedToken) {
      return res.status(400).json({
        success: false,
        message: "Invalid reset token or expired",
        data: null,
      });
    }
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    // Update superUser record with new hashed password and clear reset token
    superUser.password = hashedPassword;
    superUser.resetToken = null;

    // save superUser with latest data in the database
    await superUser.save();
    return res.status(200).json({
      success: true,
      message: "Password reset successful",
      data: superUser,
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res
      .status(500)
      .json({ success: false, message: "internal Server Error", data: null });
  }
};
