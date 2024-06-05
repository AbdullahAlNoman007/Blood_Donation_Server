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
const client_1 = require("@prisma/client");
const createAdminIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const hashPassword = yield bcrypt_1.default.hash(payload.password, Number(config_1.default.hash_salt_round));
    const user = {
        email: payload.email,
        password: hashPassword,
        role: client_1.userRole.Admin
    };
    const result = yield prismaClient_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const createUser = yield tx.user.create({
            data: user,
        });
        const adminData = {
            userId: createUser.id,
            name: payload.name,
            email: payload.email
        };
        const createAdmin = yield tx.admin.create({
            data: adminData
        });
        const contactInfo = {
            userId: createUser.id,
            email: payload.email,
            phone: payload.phone,
            socialMedia: payload.socialMedia || config_1.default.const.social,
        };
        yield tx.contactInformation.create({
            data: contactInfo
        });
        return createAdmin;
    }));
    return result;
});
const createDonorIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const hashPassword = yield bcrypt_1.default.hash(payload.password, Number(config_1.default.hash_salt_round));
    const user = {
        email: payload.email,
        password: hashPassword,
        role: client_1.userRole.Donor
    };
    const result = yield prismaClient_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const createUser = yield tx.user.create({
            data: user,
        });
        const donorData = {
            userId: createUser.id,
            name: payload.name,
            age: payload.age,
            email: payload.email,
            bloodType: payload.bloodType,
            location: payload.location,
            availability: payload.availability,
            lastDonationDate: payload.lastDonationDate
        };
        const createDonor = yield tx.donor.create({
            data: donorData
        });
        const contactInfo = {
            userId: createUser.id,
            email: payload.email,
            phone: payload.phone,
            socialMedia: payload.socialMedia || config_1.default.const.social,
        };
        yield tx.contactInformation.create({
            data: contactInfo
        });
        return createDonor;
    }));
    return result;
});
const createRequesterIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const hashPassword = yield bcrypt_1.default.hash(payload.password, Number(config_1.default.hash_salt_round));
    const user = {
        email: payload.email,
        password: hashPassword,
        role: client_1.userRole.Requester
    };
    const result = yield prismaClient_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const createUser = yield tx.user.create({
            data: user,
        });
        const requesterData = {
            userId: createUser.id,
            name: payload.name,
            email: payload.email,
            bloodType: payload.bloodType,
            location: payload.location,
        };
        const createRequester = yield tx.requester.create({
            data: requesterData
        });
        const contactInfo = {
            userId: createUser.id,
            email: payload.email,
            phone: payload.phone,
            socialMedia: payload.socialMedia || config_1.default.const.social,
        };
        yield tx.contactInformation.create({
            data: contactInfo
        });
        return createRequester;
    }));
    return result;
});
exports.userService = {
    createAdminIntoDB,
    createDonorIntoDB,
    createRequesterIntoDB
};
