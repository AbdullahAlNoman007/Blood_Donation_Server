import { accountStatus, requestStatus } from "@prisma/client";
import { z } from "zod";
import { bloodGroups } from "../User/user.const";

const donationSchema = z.object({
    body: z.object({
        donorId: z.string(),
        phoneNumber: z.string().regex(/^\d{11}$/),
        dateOfDonation: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        hospitalName: z.string(),
        hospitalAddress: z.string(),
        reason: z.string(),
    })
})

export const changeStatusValidationSchema = z.object({
    body: z.object({
        status: z.enum([accountStatus.ACTIVE, accountStatus.BLOCKED])
    })
})

const donationUpdateSchema = z.object({
    body: z.object({
        status: z.enum([requestStatus.APPROVED, requestStatus.REJECTED])
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
    donorValidationSchema,
    donationUpdateSchema,
    donationSchema
}