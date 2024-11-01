import { Router } from "express";
import {iniciar, registrar, salir, profile} from "../controllers/auth.controller.js"
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schemas.js";
//import { verifyToken } from "../../frontend/src/api/auth.js";
import { verifyToken } from "../controllers/auth.controller.js";

const router = Router();

router.post('/registrar', validateSchema(registerSchema), registrar);
router.post('/iniciar',validateSchema(loginSchema), iniciar);
router.get('/verify', verifyToken);
router.post('/salir', verifyToken, salir);
//router.post('/profile', authRequired, profile );
router.post('/inicio',authRequired);
export default router;


