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
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../Error/AppError"));
const trycatch_1 = __importDefault(require("../utility/trycatch"));
const jwt_decode_1 = require("jwt-decode");
const prismaClient_1 = __importDefault(require("../utility/prismaClient"));
const auth = () => {
    return (0, trycatch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        let decoded;
        const token = req.headers.authorization;
        if (!token) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Please Put the Access Token");
        }
        try {
            decoded = (0, jwt_decode_1.jwtDecode)(token);
        }
        catch (error) {
            console.log(error);
            next(error);
        }
        yield prismaClient_1.default.user.findUniqueOrThrow({
            where: {
                email: decoded.email
            }
        });
        req.user = decoded;
        next();
    }));
};
exports.default = auth;
