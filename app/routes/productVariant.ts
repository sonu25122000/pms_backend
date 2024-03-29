import {Router} from 'express'
import { addProductVarient, deleteProductVariant, getAllProductVariant, getProductVariant, updateProductVariant } from '../controllers/productVariant';
import { validateProductVariant, validateProductVariantUpdate } from '../utils/productVariantValidation';
import { authenticateToken, userAuthenticateToken } from '../middleware/authMiddleware';

const router = Router()

router.post("/",validateProductVariant,userAuthenticateToken,addProductVarient)
router.get("/",userAuthenticateToken,getAllProductVariant)
router.get("/:id",userAuthenticateToken,getProductVariant)
router.put("/:id",validateProductVariantUpdate,userAuthenticateToken,updateProductVariant)
router.delete("/:id",userAuthenticateToken,deleteProductVariant)


export default router;