import express from "express";
import { addVariant, deleteVariantOption, getById, getVariantOptions, updateVariantOption } from "../controllers/variantOption";
import { validateVariantOption, validateVariantOptionUpdate } from "../utils/variantOptionValidation";
import { authenticateToken, userAuthenticateToken } from "../middleware/authMiddleware";

const router = express.Router();
router.post("/:id",validateVariantOption,userAuthenticateToken,addVariant)
router.get("/",userAuthenticateToken,getVariantOptions)
router.get("/:id",userAuthenticateToken,getById)
router.put("/:id",userAuthenticateToken,updateVariantOption)
router.delete("/:id",userAuthenticateToken,deleteVariantOption)
export default router;