import { Request, Response, NextFunction } from "express";
import { LoginType, SignupType } from "../types";
import UserModel from "../models/UserModel";
import {
  GeneratePassword,
  GenerateSalt,
  ValidatePassword,
  generateSignature,
} from "../utility/PasswordUtility";
import { loginSchema, signupInputSchema } from "../validation/AuthValidation";

export const Signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, name, confirmPassword } = signupInputSchema.parse(
      req.body as SignupType
    );
    const isUserExist = await UserModel.findOne({ email });

    if (isUserExist) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });
    } else if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: {
          "confirm password": "Password and confirm password do not match",
        },
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
      const signature = await generateSignature({
        _id: newUser._id,
        email: newUser.email,
      });
      await newUser.save();
      return res.json({
        success: true,
        message: "Signed up successfully",
        data: newUser,
        token: signature,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const Login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = loginSchema.parse(req.body as LoginType);
    const isUserExist = await UserModel.findOne({ email });

    if (isUserExist) {
      const validation = await ValidatePassword(
        password,
        isUserExist.password,
        isUserExist.salt
      );

      if (validation) {
        const signature = await generateSignature({
          _id: isUserExist._id,
          email: isUserExist.email,
        });

        return res.json({
          success: true,
          message: "Logged in successfully",
          data: isUserExist,
          token: signature,
        });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Invalid email or password" });
      }
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    next(error);
  }
};
