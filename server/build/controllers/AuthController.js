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
const Signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name, confirmPassword } = req.body;
    try {
        const isUserExist = yield UserModel_1.default.findOne({ email });
        if (isUserExist) {
            res.json({ success: false, message: "User already exist" });
        }
        else if (password !== confirmPassword) {
            res.json({
                success: false,
                message: "Password and confirm password do not match",
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
            yield newUser.save();
            res.json({ success: true, message: "User created successfully" });
        }
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.Signup = Signup;
const Login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const isUserExist = yield UserModel_1.default.findOne({ email });
    if (isUserExist !== null) {
        const validation = yield (0, PasswordUtility_1.ValidatePassword)(password, isUserExist.password, isUserExist.salt);
        if (validation) {
            const signature = yield (0, PasswordUtility_1.generateSignature)({ _id: isUserExist._id });
            const oneMonthInMillis = 30 * 24 * 60 * 60 * 1000;
            res.cookie("auth-token", signature, {
                maxAge: oneMonthInMillis,
                httpOnly: true,
            });
            return res.json({
                success: true,
                message: "Logged in successfully",
                data: isUserExist,
            });
        }
        else {
            res
                .status(400)
                .json({ success: false, message: "Password did not match" });
        }
    }
    else {
        return res.json({
            success: false,
            message: "Vendor with that email does not exist",
        });
    }
});
exports.Login = Login;
