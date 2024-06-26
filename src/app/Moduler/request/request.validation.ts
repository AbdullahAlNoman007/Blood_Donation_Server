import { requestStatus } from "@prisma/client"
import { z } from "zod"

const donationSchema = z.object({
    body: z.object({
        donorId: z.string(),
        dateOfDonation: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        hospitalName: z.string(),
        hospitalAddress: z.string(),
        reason: z.string(),
    })
})

const donationUpdateSchema = z.object({
    body: z.object({
        status: z.enum([requestStatus.APPROVED, requestStatus.REJECTED])
    })
})

export const donationZodSchema = {
    donationSchema,
    donationUpdateSchema
}