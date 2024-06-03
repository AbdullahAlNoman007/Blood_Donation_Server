import { userRole } from "@prisma/client";

export interface TdecodedData {
    userId: string;
    email: string;
    role: userRole
    iat: number;
    exp: number;
}