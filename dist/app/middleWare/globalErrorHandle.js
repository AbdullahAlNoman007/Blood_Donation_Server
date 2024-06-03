"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const zodError_1 = __importDefault(require("../Error/zodError"));
const AppError_1 = __importDefault(require("../Error/AppError"));
const client_1 = require("@prisma/client");
const PrismaValidationError_1 = __importDefault(require("../Error/PrismaValidationError"));
const globalErrorHandle = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let Message = err.message || "Something Went wrong";
    let errorSource = [{
            path: '',
            message: 'Something Went wrong'
        }];
    if (err instanceof zod_1.ZodError) {
        const simpleError = (0, zodError_1.default)(err);
        statusCode = simpleError.statusCode;
        errorSource = simpleError.errorSource;
        Message = 'It is a Zod validation Error';
    }
    else if (err instanceof AppError_1.default) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        Message = err === null || err === void 0 ? void 0 : err.message;
        errorSource = [
            {
                path: '',
                message: err === null || err === void 0 ? void 0 : err.message
            }
        ];
    }
    else if (err instanceof Error) {
        Message = err === null || err === void 0 ? void 0 : err.message;
        errorSource = [
            {
                path: '',
                message: err === null || err === void 0 ? void 0 : err.message
            }
        ];
    }
    if (err instanceof client_1.Prisma.PrismaClientValidationError) {
        const simpleError = (0, PrismaValidationError_1.default)(err);
        statusCode = simpleError.statusCode;
        errorSource = simpleError.errorSource;
        Message = simpleError.Message;
    }
    return res.status(statusCode).json({
        success: false,
        message: Message,
        errorSource
    });
};
exports.default = globalErrorHandle;
