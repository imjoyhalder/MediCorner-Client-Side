export type UserRole = "ADMIN" | "CUSTOMER" | "SELLER";
export type UserStatus = "ACTIVE" | "BAN";

export interface IUser {
    id: string;
    name: string | null;
    email: string;
    role: UserRole;
    status: UserStatus;
    createdAt: string;
}