import express from "express";
import {
  authenticateToken,
  userAuthenticateToken,
} from "../middleware/authMiddleware";
import { vendorController } from "../controllers/auth/vendor";
import {
  validateVendorInput,
  validateVendorInputForUpdate,
} from "../utils/vendorValidation";

const router = express.Router();

router.post(
  "/",
  validateVendorInput,
  authenticateToken,
  vendorController.vendorRegister
);
router.get("/", userAuthenticateToken, vendorController.getAllVendorList);
router.get("/:id", userAuthenticateToken, vendorController.getVendorById);
router.put(
  "/:id",
  validateVendorInputForUpdate,
  userAuthenticateToken,
  vendorController.updateVendorById
);
router.delete("/:id", userAuthenticateToken, vendorController.deleteVendorById);
router.put(
  "/activate/:id",
  userAuthenticateToken,
  vendorController.activateVendorPartner
);
router.put(
  "/deactivate/:id",
  userAuthenticateToken,
  vendorController.deactivateVendorPartner
);

export default router;
