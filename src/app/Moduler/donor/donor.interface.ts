export interface TgetDonor {
    searchTerm?: string;
    bloodType?: string;
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
