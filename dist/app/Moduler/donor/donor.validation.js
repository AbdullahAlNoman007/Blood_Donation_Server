"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.donorZodSchema = exports.changeStatusValidationSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
exports.changeStatusValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum([client_1.accountStatus.ACTIVE, client_1.accountStatus.BLOCKED])
    })
});
const donorValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        email: zod_1.z.string().email().optional(),
        location: zod_1.z.string().optional(),
        age: zod_1.z.number().int().positive().optional(),
        lastDonationDate: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
        availability: zod_1.z.boolean().optional(),
        phone: zod_1.z.string().optional(),
        socialMedia: zod_1.z.string().optional()
    })
});
exports.donorZodSchema = {
    donorValidationSchema
};
