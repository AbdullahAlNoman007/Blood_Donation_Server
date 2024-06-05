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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requesterService = void 0;
const prismaClient_1 = __importDefault(require("../../utility/prismaClient"));
const pagination_1 = __importDefault(require("../../utility/pagination"));
const requester_const_1 = require("./requester.const");
const AppError_1 = __importDefault(require("../../Error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const getRequester = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = (0, pagination_1.default)(options);
    const { searchTerm } = params, rest = __rest(params, ["searchTerm"]);
    let andCondition = [];
    if (searchTerm) {
        andCondition.push({
            OR: requester_const_1.requesterSearchFields.map((item) => ({
                [item]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        });
    }
    if (Object.keys(rest).length > 0) {
        andCondition.push({
            OR: Object.keys(rest).map(field => ({
                [field]: {
                    equals: rest[field]
                }
            }))
        });
    }
    const whereCondition = { AND: andCondition };
    console.dir(whereCondition, { depth: 'infinity' });
    const data = yield prismaClient_1.default.requester.findMany({
        where: whereCondition,
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder
        }
    });
    const total = yield prismaClient_1.default.requester.count({ where: whereCondition });
    const meta = {
        total,
        page,
        limit
    };
    return { meta, data };
});
const deleteRequester = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        yield tx.request.deleteMany({
            where: {
                requesterId: id
            }
        });
        yield tx.contactInformation.delete({
            where: {
                userId: id
            }
        });
        const requester = yield tx.requester.delete({
            where: {
                userId: id
            }
        });
        yield tx.user.delete({
            where: {
                id: id
            }
        });
        return requester;
    }));
    return result;
});
const changeStatus = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        yield tx.user.update({
            where: {
                id: id
            },
            data: {
                status: payload.status
            }
        });
        const donor = yield tx.donor.update({
            where: {
                id: id
            },
            data: {
                status: payload.status
            }
        });
        return donor;
    }));
    return result;
});
const updateRequester = (id, payload, decoded) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, phone, socialMedia } = payload, rest = __rest(payload, ["email", "phone", "socialMedia"]);
    if (decoded.role === 'Requester' && decoded.userId !== id) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "As a Requester, you can't update other Requester's Info");
    }
    yield prismaClient_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        if (email) {
            yield tx.user.update({
                where: { id },
                data: { email }
            });
            yield tx.requester.update({
                where: { id },
                data: { email }
            });
        }
        const contactInfoPayload = {};
        if (email)
            contactInfoPayload.email = email;
        if (phone)
            contactInfoPayload.phone = phone;
        if (socialMedia)
            contactInfoPayload.socialMedia = socialMedia;
        if (Object.keys(contactInfoPayload).length > 0) {
            yield tx.contactInformation.update({
                where: { id },
                data: contactInfoPayload
            });
        }
        if (Object.keys(rest).length > 0) {
            yield tx.requester.update({
                where: { id },
                data: rest
            });
        }
    }));
    return { message: "Requester's Data is Updated!!!" };
});
exports.requesterService = {
    getRequester,
    deleteRequester,
    changeStatus,
    updateRequester
};
