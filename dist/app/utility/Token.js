"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const token = (payload, privateKey, expiresTime) => {
    const createdToken = jsonwebtoken_1.default.sign(payload, privateKey, { algorithm: 'HS256', expiresIn: expiresTime });
    return createdToken;
};
exports.default = token;
