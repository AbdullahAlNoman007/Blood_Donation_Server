import { BloodType } from "@prisma/client";

export interface TgetRequester {
    searchTerm?: string;
    bloodType?: BloodType;
}

export interface TdonationRequest {
    donorId: string;
    phoneNumber: string;
    dateOfDonation: string;
    hospitalName: string;
    hospitalAddress: string;
    reason: string;
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
