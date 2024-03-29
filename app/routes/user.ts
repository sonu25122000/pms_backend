import express from "express";
import {
  passwordValidation,
  validateUserInput,
} from "../utils/inputValidation";
import {
  changePassword,
  confirmPassword,
  forgetPassword,
  getAllUser,
  login,
} from "../controllers/auth/user";
import {
  authenticateToken,
  userAuthenticateToken,
} from "../middleware/authMiddleware";
import { confirmPasswordValidation } from "../utils/superAdminValidation";

const router = express.Router();

// router.post("/register", validateUserInput, register);
router.post("/login", login);
router.post(
  "/change-password",
  passwordValidation,
  userAuthenticateToken,
  changePassword
);
router.post("/forgot-password", forgetPassword);
router.put("/confirm-password",confirmPasswordValidation, confirmPassword);
router.get("/", getAllUser);

export default router;
