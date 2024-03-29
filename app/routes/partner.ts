import express from "express";
import { authenticateToken, userAuthenticateToken } from "../middleware/authMiddleware";
import { getPartners } from "../controllers/partnerController";
import { partnerInputValidation } from "../utils/partnerValidation";

const router = express.Router();

router.get("/", userAuthenticateToken, getPartners);

export default router;