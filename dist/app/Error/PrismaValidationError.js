"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const handlePrismaValidationError = (err) => {
    const statusCode = http_status_1.default.NOT_FOUND;
    const Message = err.name;
    const errorMessage = err.message;
    const start_index = errorMessage.indexOf("Unknown argument");
    const end_index = errorMessage.indexOf("?", start_index) + 1;
    const extractedMessage = start_index !== -1 && end_index !== -1 ? errorMessage.substring(start_index, end_index).trim() : "Error message not found";
    const errorSource = [
        {
            path: '',
            message: errorMessage
        }
    ];
    return {
        statusCode,
        Message,
        errorSource
    };
};
exports.default = handlePrismaValidationError;
