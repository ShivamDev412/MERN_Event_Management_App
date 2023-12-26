import { Request, Response, NextFunction } from "express";
import { LoginType, SignupType } from "../types";
import UserModel from "../models/UserModel";
import {
  GeneratePassword,
  GenerateSalt,
  ValidatePassword,
  generateSignature,
} from "../utility/PasswordUtility";
export const Signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, name, confirmPassword } = req.body as SignupType;
  try {
    const isUserExist = await UserModel.findOne({ email });
    if (isUserExist) {
      res.json({ success: false, message: "User already exist" });
    } else if (password !== confirmPassword) {
      res.json({
        success: false,
        message: "Password and confirm password do not match",
      });
    } else {
      const salt = await GenerateSalt();
      const hashedPassword = await GeneratePassword(password, salt);
      const newUser = await UserModel.create({
        name,
        email,
        password: hashedPassword,
        salt,
      });
      await newUser.save();
      res.json({ success: true, message: "User created successfully" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const Login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body as LoginType;
  const isUserExist = await UserModel.findOne({ email });
  if (isUserExist !== null) {
    const validation = await ValidatePassword(
      password,
      isUserExist.password,
      isUserExist.salt
    );
    if (validation) {
      const signature = await generateSignature({ _id: isUserExist._id });
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
    } else {
      res
        .status(400)
        .json({ success: false, message: "Password did not match" });
    }
  } else {
    return res.json({
      success: false,
      message: "Vendor with that email does not exist",
    });
  }
};
