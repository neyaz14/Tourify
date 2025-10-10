/**
name: String
email: String (unique)
password: String
role: String (e.g., Admin, User)
phone: String
picture: String
address: String
isDeleted: Boolean
isActive: String (e.g., Active, Inactive)
isVerified: Boolean
auths: Array of auth providers (e.g., Google, Facebook)
*/

export interface IUser {
    name: string,
    email: string,
    password?: string,
    phone?: string,
    picture?: string,
    address?: string,

    role: Role,
    auths: IAuthProviders[],
   

    isActive?: IsActive,
    isVerified?: boolean,
    isDeleted?: boolean,

     // TODO : fix this 
    bookings?: string, // bookings collection er object id er array 
    guides?: string,// guides collection er object id er array 
}

export enum Role {
    Super_Admin = "superAdmin",
    Admin = "admin",
    User = "user",
    Guide = "guide",
}

export enum IsActive {
    Active = 'active',
    InActive = 'inactive',
    Block = 'block',
}

export interface IAuthProviders {
    providers: string,
    providerId: string
}