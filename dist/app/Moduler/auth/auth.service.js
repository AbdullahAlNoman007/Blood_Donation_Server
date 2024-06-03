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
exports.authService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../Error/AppError"));
const prismaClient_1 = __importDefault(require("../../utility/prismaClient"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const Token_1 = __importDefault(require("../../utility/Token"));
const loginInDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield prismaClient_1.default.user.findUniqueOrThrow({
        where: {
            email: payload.email
        }
    });
    const isPasswordMatched = bcrypt_1.default.compareSync(payload.password, isUserExists.password);
    if (!isPasswordMatched) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Password doesn't match");
    }
    const jwtPayload = {
        userId: isUserExists.id,
        email: isUserExists.email
    };
    const accessToken = (0, Token_1.default)(jwtPayload, config_1.default.jwt.jwt_access_token, config_1.default.jwt.jwt_access_expires_in);
    return {
        id: isUserExists.id,
        name: isUserExists.name,
        email: isUserExists.email,
        token: accessToken
    };
});
exports.authService = {
    loginInDB
};
