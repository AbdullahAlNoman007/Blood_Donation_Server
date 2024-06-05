import { BloodType } from "@prisma/client";

export interface TgetRequester {
    searchTerm?: string;
    bloodType?: BloodType;
}

export interface requesterUpdatePayload {
    name?: string;
    email?: string;
    location?: string;
    age?: number;
    lastDonationDate?: string;
    phone?: string;
    socialMedia?: string;
}

export type IcontactInformation = {
    email?: string;
    phone?: string;
    socialMedia?: string;
}

