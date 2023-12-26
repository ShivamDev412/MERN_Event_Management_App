"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const endpoints_1 = require("../utility/endpoints");
const AuthController_1 = require("../controllers/AuthController");
const errorHandler_1 = require("../middleware/errorHandler");
const router = express_1.default.Router();
router.use(errorHandler_1.errorHandler);
router.post(endpoints_1.ENDPOINTS.LOGIN, AuthController_1.Login);
router.post(endpoints_1.ENDPOINTS.SIGNUP, AuthController_1.Signup);
exports.default = router;
