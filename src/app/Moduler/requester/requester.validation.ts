import { requestStatus } from "@prisma/client";
import { z } from "zod";

export const donationSchema = z.object({
    body: z.object({
        donorId: z.string(),
        phoneNumber: z.string().regex(/^\d{11}$/),
        dateOfDonation: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        hospitalName: z.string(),
        hospitalAddress: z.string(),
        reason: z.string(),
    })
})

export const donationUpdateSchema = z.object({
    body: z.object({
        status: z.enum([requestStatus.APPROVED, requestStatus.REJECTED])
    })
})