import { BloodType } from "@prisma/client";

export interface TgetDonor {
    searchTerm?: string;
    bloodType?: BloodType;
    availability?: string;
}

export interface TdonationRequest {
    donorId: string;
    phoneNumber: string;
    dateOfDonation: string;
    hospitalName: string;
    hospitalAddress: string;
    reason: string;
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
