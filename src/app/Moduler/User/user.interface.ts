export interface User {
    name: string;
    email: string;
    password: string;
    bloodType: string;
    location: string;
    age: number;
    bio: string;
    lastDonationDate: string;
}

export interface userUpdateData {
    bio: string;
    age: number;
    lastDonationDate: string;
}
