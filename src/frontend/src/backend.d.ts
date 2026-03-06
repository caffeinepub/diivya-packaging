import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface CompanyContactDetails {
    googleMapsUrl: string;
    physicalAddress: string;
    emailAddress: string;
    phoneNumber: string;
}
export interface UserProfile {
    name: string;
}
export interface ContactFormEntry {
    name: string;
    email: string;
    message: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllContactFormEntries(): Promise<Array<ContactFormEntry>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCompanyContactDetails(): Promise<CompanyContactDetails>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setCompanyContactDetails(phoneNumber: string, emailAddress: string, physicalAddress: string, googleMapsUrl: string): Promise<void>;
    submitContactForm(name: string, email: string, message: string): Promise<void>;
}
