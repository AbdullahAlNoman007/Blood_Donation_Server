import { z } from "zod";
import { bloodGroups } from "./user.const";

const userValidationSchema = z.object({
    body: z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
        bloodType: z.enum(bloodGroups),
        location: z.string(),
        age: z.number().int().positive(),
        bio: z.string(),
        lastDonationDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    })
})
const userUpdateSchema = z.object({
    body: z.object({
        bio: z.string().optional(),
        age: z.number().optional(),
        lastDonationDate: z.string().optional()
    })
})

export const validationSchema = {
    userValidationSchema,
    userUpdateSchema
}