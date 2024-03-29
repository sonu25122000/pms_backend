import express from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategory,
  getCategoryBasedOnSlug,
  getSingleCategory,
  updateCategory,
} from "../controllers/categoryController";
import {
  categoryValidation,
  updateCategoryValidation,
} from "../utils/categoryValidation";
import { authenticateToken, userAuthenticateToken } from "../middleware/authMiddleware";

const router = express.Router();
router.get("/category/*", userAuthenticateToken, getCategoryBasedOnSlug);
router.post("/", categoryValidation, userAuthenticateToken, addCategory);
router.get("/", userAuthenticateToken, getAllCategory);
router.get("/:categoryId", userAuthenticateToken, getSingleCategory);
router.put(
  "/:categoryId",
  updateCategoryValidation,
  userAuthenticateToken,
  updateCategory
);
router.delete("/:categoryId", userAuthenticateToken, deleteCategory);

export default router;
