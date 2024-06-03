import { z } from "zod";
import { bloodGroups } from "./user.const";

const donorValidationSchema = z.object({
    body: z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
        bloodType: z.enum(bloodGroups),
        location: z.string(),
        age: z.number().int().positive(),
        lastDonationDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        availability: z.boolean(),
        phone: z.string(),
        socialMedia: z.string().optional()
    })
});

const requesterValidationSchema = z.object({
    body: z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
        bloodType: z.enum(bloodGroups),
        location: z.string(),
        phone: z.string(),
        socialMedia: z.string().optional()
    })
});

const adminValidationSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string().min(6),
        name: z.string(),
        phone: z.string(),
        socialMedia: z.string().optional()
    })
});

export const validationSchema = {
    adminValidationSchema,
    donorValidationSchema,
    requesterValidationSchema
}