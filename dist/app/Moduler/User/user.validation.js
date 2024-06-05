"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationSchema = void 0;
const zod_1 = require("zod");
const user_const_1 = require("./user.const");
const donorValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(6),
        bloodType: zod_1.z.enum(user_const_1.bloodGroups),
        location: zod_1.z.string(),
        age: zod_1.z.number().int().positive(),
        lastDonationDate: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        availability: zod_1.z.boolean(),
        phone: zod_1.z.string(),
        socialMedia: zod_1.z.string().optional()
    })
});
const requesterValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(6),
        bloodType: zod_1.z.enum(user_const_1.bloodGroups),
        location: zod_1.z.string(),
        phone: zod_1.z.string(),
        socialMedia: zod_1.z.string().optional()
    })
});
const adminValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(6),
        name: zod_1.z.string(),
        phone: zod_1.z.string(),
        socialMedia: zod_1.z.string().optional()
    })
});
exports.validationSchema = {
    adminValidationSchema,
    donorValidationSchema,
    requesterValidationSchema
};
