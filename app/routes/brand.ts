import express from "express";
import { brandController } from "../controllers/brand";
import { userAuthenticateToken } from "../middleware/authMiddleware";
import multer from "multer";
const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.get("/",userAuthenticateToken, brandController.getAllBrand);
router.get("/:id",userAuthenticateToken, brandController.getBrandById);
router.delete("/:id",userAuthenticateToken, brandController.deleteBrandById);
router.put("/:id",userAuthenticateToken,upload.single("myImage"), brandController.updateBrandById);
router.post("/",userAuthenticateToken,upload.single("myImage"),brandController.addBrand);

export default router;