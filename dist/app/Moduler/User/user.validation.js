"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationSchema = void 0;
const zod_1 = require("zod");
const user_const_1 = require("./user.const");
const userValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(6),
        bloodType: zod_1.z.enum(user_const_1.bloodGroups),
        location: zod_1.z.string(),
        age: zod_1.z.number().int().positive(),
        bio: zod_1.z.string(),
        lastDonationDate: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // Assuming date format YYYY-MM-DD
    })
});
const userUpdateSchema = zod_1.z.object({
    body: zod_1.z.object({
        bio: zod_1.z.string().optional(),
        age: zod_1.z.number().optional(),
        lastDonationDate: zod_1.z.string().optional()
    })
});
exports.validationSchema = {
    userValidationSchema,
    userUpdateSchema
};
