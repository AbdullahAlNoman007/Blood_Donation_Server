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
exports.donationService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../Error/AppError"));
const prismaClient_1 = __importDefault(require("../../utility/prismaClient"));
const createDonationRequest = (decoded, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const donor = yield prismaClient_1.default.donor.findUniqueOrThrow({
        where: {
            userId: payload.donorId
        }
    });
    const requester = yield prismaClient_1.default.requester.findUniqueOrThrow({
        where: {
            userId: decoded.userId
        }
    });
    if (donor.bloodType !== requester.bloodType) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Your blood type doesn't match with donor's blood type");
    }
    const contactInfo = yield prismaClient_1.default.contactInformation.findUniqueOrThrow({
        where: {
            userId: decoded.userId
        }
    });
    const data = Object.assign({ requesterId: decoded.userId, phoneNumber: contactInfo.phone }, payload);
    const result = yield prismaClient_1.default.request.create({
        data: data
    });
    return result;
});
const getDonationRequestion = (decoded) => __awaiter(void 0, void 0, void 0, function* () {
    const roleKey = decoded.role === 'Donor' ? 'donorId' : 'requesterId';
    const includeRelation = decoded.role === 'Donor' ? 'requester' : 'donor';
    const result = yield prismaClient_1.default.request.findMany({
        where: {
            [roleKey]: decoded.userId,
        },
        include: {
            [includeRelation]: {
                include: {
                    user: {
                        include: {
                            ContactInformation: true,
                        },
                    },
                },
            },
        },
    });
    const finalResult = result.map(item => {
        const _a = item, _b = includeRelation, { user: { ContactInformation } } = _a[_b], rest = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
        return rest.requestStatus === 'APPROVED'
            ? Object.assign(Object.assign({}, rest), { contactInformation: ContactInformation }) : Object.assign({}, rest);
    });
    return finalResult;
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
exports.donationService = {
    createDonationRequest,
    getDonationRequestion,
    updateDonationRequestion
};
