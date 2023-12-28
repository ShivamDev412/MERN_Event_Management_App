import express from "express";
import { ENDPOINTS } from "../utility/endpoints";
import { Login, Signup } from "../controllers/AuthController";
import { errorHandler } from "../middleware/errorHandler";

const router = express.Router();

router.post(ENDPOINTS.LOGIN, Login);
router.post(ENDPOINTS.SIGNUP, Signup);
router.use(errorHandler);
export default router;
