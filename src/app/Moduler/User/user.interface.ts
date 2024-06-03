import { BloodType } from "@prisma/client";

export interface donorPayload {
    name: string;
    email: string;
    password: string;
    bloodType: BloodType;
    location: string;
    age: number;
    lastDonationDate: string;
    availability: boolean;
    phone: string;
    socialMedia?: string;
}

export interface requesterPayload {
    name: string;
    email: string;
    password: string;
    bloodType: BloodType;
    location: string;
    phone: string;
    socialMedia?: string;
}

export interface adminPayload {
    email: string;
    password: string;
    name: string;
    phone: string;
    socialMedia?: string;
}

export interface userUpdateData {
    bio: string;
    age: number;
    lastDonationDate: string;
}
