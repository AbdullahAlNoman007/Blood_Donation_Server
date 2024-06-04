import { z } from "zod";

export const loginValidation = z.object({
    body: z.object({
        email: z.string(),
        password: z.string()
    })
})

export const changePasswordValidation = z.object({
    body: z.object({
        oldPassword: z.string(),
        newPassword: z.string(),
        confirmPassword: z.string(),
    })
})