import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface EditableUserProfile {
    jewellery: Array<string>;
    stylePreference: StylePreference;
    accessories: Array<string>;
    skinTone: string;
    occasion: Occasion;
    bodyType: string;
    outfits: Array<string>;
}
export interface Occasion {
    category: OccasionCategory;
    subOccasion: string;
}
export interface EditableOutfitRecommendation {
    jewellery: Array<string>;
    outfitName: string;
    description: string;
    colorPalette: Array<string>;
    styleTips: string;
}
export declare enum OccasionCategory {
    work = "work",
    festive = "festive",
    casual = "casual",
    special = "special",
    formal = "formal"
}
export declare enum StylePreference {
    western = "western",
    indian = "indian",
    indoWestern = "indoWestern"
}
export declare enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addSubOccasion(name: string, category: OccasionCategory): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAccessories(): Promise<Array<string>>;
    getAllFestiveSubOccasions(): Promise<Array<string>>;
    getAllProfiles(): Promise<Array<EditableUserProfile>>;
    getAllProfilesByBodyTypes(): Promise<Array<EditableUserProfile>>;
    getCallerRecommendations(): Promise<Array<EditableOutfitRecommendation>>;
    getCallerUserProfile(): Promise<EditableUserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getFavorites(): Promise<Array<string>>;
    getJewellery(): Promise<Array<string>>;
    getOutfits(): Promise<Array<string>>;
    getRecommendationsForOccasion(subOccasion: string): Promise<Array<EditableOutfitRecommendation>>;
    getUserProfile(user: Principal): Promise<EditableUserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    setAccessories(newAccessories: Array<string>): Promise<void>;
    setFavorites(newFavorites: Array<string>): Promise<void>;
    setJewellery(newJewellery: Array<string>): Promise<void>;
    setOutfits(newOutfits: Array<string>): Promise<void>;
    updateProfile(profile: EditableUserProfile): Promise<void>;
    upsertProfile(profile: EditableUserProfile): Promise<void>;
}
