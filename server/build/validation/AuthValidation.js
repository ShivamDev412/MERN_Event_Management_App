"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.signupInputSchema = void 0;
const z = __importStar(require("zod"));
exports.signupInputSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
        .string()
        .refine((password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{6,20}$/.test(password), {
        message: "Password must be between 6 and 20 characters and include at least one uppercase letter, one lowercase letter, and one special character",
    }),
    name: z
        .string()
        .max(30)
        .refine((name) => /^[a-zA-Z\s]+$/.test(name), {
        message: "Name can only contain letters and spaces",
    }),
    confirmPassword: z.string(),
});
exports.loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string(),
});
