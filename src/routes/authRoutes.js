import { Router } from "express";
import { checkSchema } from "express-validator";
import validate from "../middleware/validate.js";
import authMiddleWare from "../middleware/authMiddleWare.js";
import { Login,SignUp,GoogleAuth,setPassword } from "../controllers/authControllers.js";
import { LoginValidationSchema,SignUpValidationSchema,PasswordValidationSchema ,GoogleValidationSchema} from "../utils/auth.validation.js";

const router = Router();

router.post('/login',checkSchema(LoginValidationSchema),validate,Login);

router.post('/password',authMiddleWare,checkSchema(PasswordValidationSchema),validate,setPassword);

router.post('/signup',checkSchema(SignUpValidationSchema),validate,SignUp);

router.post('/google',checkSchema(GoogleValidationSchema),validate,GoogleAuth);

export default router;