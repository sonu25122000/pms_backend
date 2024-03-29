import express from "express";
import {
  activateDeliveryParter,
  deactivateDeliveryParter,
  deleteDeliveryPartnerController,
  getAllDeliveryPartnerController,
  getDeliveryPartnerController,
  registerController,
  updateDeliveryPartnerController,
} from "../controllers/auth/deliveryPartner";
import { authenticateToken } from "../middleware/authMiddleware";
import { validateDevileryPartner, validateUpdateDeliveryPartner } from "../utils/deliveryPartnerValidation";

const router = express.Router();

router.post(
  "/register",
  validateDevileryPartner,
  authenticateToken,
  registerController
);
router.get("/",authenticateToken, getAllDeliveryPartnerController);
router.get("/:id", authenticateToken, getDeliveryPartnerController);
router.put("/:id", validateUpdateDeliveryPartner,authenticateToken, updateDeliveryPartnerController);
router.delete("/:id", authenticateToken, deleteDeliveryPartnerController);
router.put("/activate/:id", authenticateToken, activateDeliveryParter);
router.put("/deactivate/:id", authenticateToken, deactivateDeliveryParter);

export default router;
