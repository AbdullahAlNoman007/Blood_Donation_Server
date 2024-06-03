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
