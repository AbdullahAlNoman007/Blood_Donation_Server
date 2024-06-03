"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.donationUpdateSchema = exports.donationSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
exports.donationSchema = zod_1.z.object({
    body: zod_1.z.object({
        donorId: zod_1.z.string(),
        phoneNumber: zod_1.z.string().regex(/^\d{11}$/),
        dateOfDonation: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        hospitalName: zod_1.z.string(),
        hospitalAddress: zod_1.z.string(),
        reason: zod_1.z.string(),
    })
});
exports.donationUpdateSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum([client_1.requestStatus.APPROVED, client_1.requestStatus.REJECTED])
    })
});
