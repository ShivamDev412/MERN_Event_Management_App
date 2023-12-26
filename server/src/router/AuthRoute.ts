import express from "express";
import { ENDPOINTS } from "../utility/endpoints";
import { Login } from "../controllers/AuthController";

const router = express.Router();

router.get(ENDPOINTS.LOGIN, Login);
export default router;
