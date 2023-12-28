"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const zod_1 = require("zod");
const errorHandler = (error, req, res, next) => {
    if (error instanceof zod_1.ZodError) {
        const errors = {};
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
        const errors = {};
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
exports.errorHandler = errorHandler;
