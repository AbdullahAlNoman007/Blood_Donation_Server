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
exports.donorService = void 0;
const prismaClient_1 = __importDefault(require("../../utility/prismaClient"));
const donor_const_1 = require("./donor.const");
const pagination_1 = __importDefault(require("../../utility/pagination"));
const AppError_1 = __importDefault(require("../../Error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const getDonor = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { page, limit, skip, sortBy, sortOrder } = (0, pagination_1.default)(options);
    const { searchTerm } = params, rest = __rest(params, ["searchTerm"]);
    let andCondition = [];
    if (searchTerm) {
        const [bloodGroup, rhFactor] = searchTerm.split(' ');
        const validBloodGroups = ['A', 'B', 'AB', 'O'];
        const validRhFactors = ['positive', 'negative'];
        if (bloodGroup && rhFactor && validBloodGroups.includes(bloodGroup.toUpperCase()) && validRhFactors.includes(rhFactor.toLowerCase())) {
            let bloodType;
            if (rhFactor.toLowerCase() === 'positive') {
                bloodType = bloodGroup + '+';
            }
            else if (rhFactor.toLowerCase() === 'negative') {
                bloodType = bloodGroup + '-';
            }
            andCondition.push({
                OR: [
                    {
                        bloodType: {
                            contains: bloodType,
                            mode: 'insensitive'
                        }
                    }
                ]
            });
        }
        else {
            andCondition.push({
                OR: donor_const_1.donorSearchFields.map(field => ({
                    [field]: {
                        contains: params.searchTerm,
                        mode: 'insensitive'
                    }
                }))
            });
        }
    }
    if (Object.keys(rest).length > 0) {
        if (Object.keys(rest).includes('availability')) {
            const value = Boolean(rest['availability'] === "false" ? '' : rest['availability']);
            andCondition.push({
                OR: [
                    {
                        availability: { equals: value }
                    }
                ]
            });
        }
        if (Object.keys(rest).includes('bloodType')) {
            let bloodType = '';
            const blood = (_a = rest['bloodType']) === null || _a === void 0 ? void 0 : _a.split(' ')[0].toUpperCase();
            const type = (_b = rest['bloodType']) === null || _b === void 0 ? void 0 : _b.split(' ')[1].toLowerCase();
            const validBloodGroups = ['A', 'B', 'AB', 'O'];
            if (validBloodGroups.includes(blood.toUpperCase())) {
                if (type === 'positive') {
                    bloodType = blood + '+';
                }
                else if (type === 'negative') {
                    bloodType = blood + '-';
                }
                if (type === 'positive' || type === 'negative') {
                    andCondition.push({
                        OR: [
                            {
                                bloodType: { equals: bloodType }
                            }
                        ]
                    });
                }
            }
        }
    }
    //console.dir(andCondition, { depth: 'infinity' });
    const whereCondition = { AND: andCondition };
    const data = yield prismaClient_1.default.user.findMany({
        where: whereCondition,
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder
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
    const total = yield prismaClient_1.default.user.count();
    const meta = {
        total,
        page,
        limit
    };
    return { meta, data };
});
const createDonorRequest = (decoded, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield prismaClient_1.default.user.findUniqueOrThrow({
        where: {
            id: payload.donorId
        }
    });
    const data = Object.assign({ requesterId: decoded.userId }, payload);
    const result = yield prismaClient_1.default.request.create({
        data: data,
        select: {
            id: true,
            donorId: true,
            phoneNumber: true,
            dateOfDonation: true,
            hospitalName: true,
            hospitalAddress: true,
            reason: true,
            requestStatus: true,
            createdAt: true,
            updatedAt: true,
            donor: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    bloodType: true,
                    location: true,
                    availability: true,
                    createdAt: true,
                    updatedAt: true,
                    password: false,
                    userProfile: true
                }
            }
        }
    });
    return result;
});
const getDonationRequestion = (decoded) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.default.request.findMany({
        where: {
            donorId: decoded.userId
        },
        select: {
            id: true,
            donorId: true,
            requesterId: true,
            phoneNumber: true,
            dateOfDonation: true,
            hospitalName: true,
            hospitalAddress: true,
            reason: true,
            requestStatus: true,
            createdAt: true,
            updatedAt: true,
            requester: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    bloodType: true,
                    location: true,
                    availability: true
                }
            }
        }
    });
    return result;
});
const updateDonationRequestion = (id, payload, decoded) => __awaiter(void 0, void 0, void 0, function* () {
    const request = yield prismaClient_1.default.request.findUniqueOrThrow({
        where: {
            id: id
        }
    });
    if (request.donorId !== decoded.userId) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "You can't update another donor's request");
    }
    const result = yield prismaClient_1.default.request.update({
        where: {
            id: id
        },
        data: {
            requestStatus: payload.status
        }
    });
    return result;
});
exports.donorService = {
    getDonor,
    createDonorRequest,
    getDonationRequestion,
    updateDonationRequestion
};
