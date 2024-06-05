"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requesterZodSchema = void 0;
const zod_1 = require("zod");
const requesterUpdatedSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        email: zod_1.z.string().email().optional(),
        location: zod_1.z.string().optional(),
        age: zod_1.z.number().int().positive().optional(),
        lastDonationDate: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
        phone: zod_1.z.string().optional(),
        socialMedia: zod_1.z.string().optional()
    })
});
exports.requesterZodSchema = {
    requesterUpdatedSchema
};
