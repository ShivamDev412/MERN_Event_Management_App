"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = exports.Signup = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel"));
const PasswordUtility_1 = require("../utility/PasswordUtility");
const AuthValidation_1 = require("../validation/AuthValidation");
const Signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, name, confirmPassword } = AuthValidation_1.signupInputSchema.parse(req.body);
        const isUserExist = yield UserModel_1.default.findOne({ email });
        if (isUserExist) {
            return res
                .status(409)
                .json({ success: false, message: "User already exists" });
        }
        else if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Validation error",
                errors: {
                    "confirm password": "Password and confirm password do not match",
                },
            });
        }
        else {
            const salt = yield (0, PasswordUtility_1.GenerateSalt)();
            const hashedPassword = yield (0, PasswordUtility_1.GeneratePassword)(password, salt);
            const newUser = yield UserModel_1.default.create({
                name,
                email,
                password: hashedPassword,
                salt,
            });
            const signature = yield (0, PasswordUtility_1.generateSignature)({
                _id: newUser._id,
                email: newUser.email,
            });
            yield newUser.save();
            return res.json({
                success: true,
                message: "Signed up successfully",
                data: newUser,
                token: signature,
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.Signup = Signup;
const Login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = AuthValidation_1.loginSchema.parse(req.body);
        const isUserExist = yield UserModel_1.default.findOne({ email });
        if (isUserExist) {
            const validation = yield (0, PasswordUtility_1.ValidatePassword)(password, isUserExist.password, isUserExist.salt);
            if (validation) {
                const signature = yield (0, PasswordUtility_1.generateSignature)({
                    _id: isUserExist._id,
                    email: isUserExist.email,
                });
                return res.json({
                    success: true,
                    message: "Logged in successfully",
                    data: isUserExist,
                    token: signature,
                });
            }
            else {
                return res
                    .status(400)
                    .json({ success: false, message: "Invalid email or password" });
            }
        }
        else {
            return res
                .status(400)
                .json({ success: false, message: "Invalid email or password" });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.Login = Login;
