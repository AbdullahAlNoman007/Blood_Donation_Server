import { z } from "zod";


const requesterUpdatedSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        email: z.string().email().optional(),
        location: z.string().optional(),
        age: z.number().int().positive().optional(),
        lastDonationDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
        phone: z.string().optional(),
        socialMedia: z.string().optional()
    })
});

export const requesterZodSchema = {
    requesterUpdatedSchema
}