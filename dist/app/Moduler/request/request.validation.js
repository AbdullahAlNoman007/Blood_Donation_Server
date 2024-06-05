"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.donationZodSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const donationSchema = zod_1.z.object({
    body: zod_1.z.object({
        donorId: zod_1.z.string(),
        dateOfDonation: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        hospitalName: zod_1.z.string(),
        hospitalAddress: zod_1.z.string(),
        reason: zod_1.z.string(),
    })
});
const donationUpdateSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum([client_1.requestStatus.APPROVED, client_1.requestStatus.REJECTED])
    })
});
exports.donationZodSchema = {
    donationSchema,
    donationUpdateSchema
};
