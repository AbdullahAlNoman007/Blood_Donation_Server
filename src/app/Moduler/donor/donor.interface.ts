import { BloodType } from "@prisma/client";

export interface TgetDonor {
    searchTerm?: string;
    bloodType?: BloodType;
    availability?: string;
}

export interface donorUpdatePayload {
    name?: string;
    email?: string;
    location?: string;
    age?: number;
    lastDonationDate?: string;
    availability?: boolean;
    phone?: string;
    socialMedia?: string;
}
export type IcontactInformation = {
    email?: string;
    phone?: string;
    socialMedia?: string;
}
