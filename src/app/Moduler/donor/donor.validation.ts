import { accountStatus } from "@prisma/client";
import { z } from "zod";


export const changeStatusValidationSchema = z.object({
    body: z.object({
        status: z.enum([accountStatus.ACTIVE, accountStatus.BLOCKED])
    })
})

const donorValidationSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        email: z.string().email().optional(),
        location: z.string().optional(),
        age: z.number().int().positive().optional(),
        lastDonationDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
        availability: z.boolean().optional(),
        phone: z.string().optional(),
        socialMedia: z.string().optional()
    })
});

export const donorZodSchema = {
    donorValidationSchema
}