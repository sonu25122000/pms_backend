import express from "express";
import {
  register,
  login,
  changePassword,
  forgotPassword,
  confirmPassword,
} from "../controllers/auth/superAdmin";
import { authenticateToken } from "../middleware/authMiddleware";
import {
  confirmPasswordValidation,
  validateSuperAdminInput,
} from "../utils/superAdminValidation";
import { passwordValidation } from "../utils/inputValidation";

const router = express.Router();

router.post("/register", validateSuperAdminInput, register);
router.post("/login", login);
router.post(
  "/change-password",
  passwordValidation,
  authenticateToken,
  changePassword
);
router.post("/forgot-password", forgotPassword);
router.post("/confirm-password", confirmPasswordValidation, confirmPassword);

export default router;
