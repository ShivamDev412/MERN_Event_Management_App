import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request } from "express";
dotenv.config();
export const GenerateSalt = async () => {
  return await bcrypt.genSalt();
};
export const GeneratePassword = async (password: string, salt: string) => {
  return await bcrypt.hash(password, salt);
};
export const ValidatePassword = async (
  password: string,
  savedPassword: string,
  salt: string
) => {
  return (await GeneratePassword(password, salt)) === savedPassword;
};
export const generateSignature = async (payload: {
  _id: string;
  email: string;
}) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "30d" });
};

export const validateSignature = async (req: Request) => {
  const token = req.cookies["auth-token"];

  if (token) {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as any;
    // @ts-ignore
    req.user = payload;
    return true;
  }
  return false;
};
