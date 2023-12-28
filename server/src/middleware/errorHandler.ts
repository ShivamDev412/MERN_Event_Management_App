import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ZodError } from "zod";
export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  if (error instanceof ZodError) {
    const errors: Record<string, string> = {};
    error.errors.forEach((issue) => {
      errors[issue.path[0]] = issue.message;
    });
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors,
    });
  }
  if (error.name === "ValidationError") {
    const errors: Record<string, string> = {};
    for (const field in error.errors) {
      errors[field] = error.errors[field].message;
    }
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors,
    });
  }

  if (error.name === "MongoError" && error.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "Duplicate key error",
    });
  }

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
  next();
};
