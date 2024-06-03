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
exports.userService = void 0;
const config_1 = __importDefault(require("../../config"));
const prismaClient_1 = __importDefault(require("../../utility/prismaClient"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const hashPassword = yield bcrypt_1.default.hash(payload.password, Number(config_1.default.hash_salt_round));
    const user = {
        name: payload.name,
        email: payload.email,
        password: hashPassword,
        bloodType: payload.bloodType,
        location: payload.location
    };
    const result = yield prismaClient_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const createUser = yield tx.user.create({
            data: user,
            select: {
                id: true,
                name: true,
                email: true,
                bloodType: true,
                location: true,
                availability: true,
                createdAt: true,
                updatedAt: true
            }
        });
        const userProfile = {
            userId: createUser.id,
            bio: payload.bio,
            age: payload.age,
            lastDonationDate: payload.lastDonationDate
        };
        const createUserProfile = yield tx.userProfile.create({
            data: userProfile
        });
        return Object.assign(Object.assign({}, createUser), { userProfile: createUserProfile });
    }));
    return result;
});
const getProfile = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.default.user.findUniqueOrThrow({
        where: {
            email: payload.email
        },
        select: {
            id: true,
            name: true,
            email: true,
            bloodType: true,
            location: true,
            availability: true,
            createdAt: true,
            updatedAt: true,
            userProfile: true,
        }
    });
    return result;
});
const updateProfile = (decode, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield prismaClient_1.default.user.findUniqueOrThrow({
        where: {
            email: decode.email
        }
    });
    yield prismaClient_1.default.userProfile.findUniqueOrThrow({
        where: {
            userId: decode.userId
        }
    });
    const updateUserProfile = yield prismaClient_1.default.userProfile.update({
        where: {
            userId: decode.userId
        },
        data: payload
    });
    return updateUserProfile;
});
exports.userService = {
    createUserIntoDB,
    getProfile,
    updateProfile
};
