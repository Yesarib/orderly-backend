import { Types } from "mongoose"

export enum Roles {
    WAITER = "Garson",
    KITCHEN = "Mutfak",
    CHECKOUT = "Kasa",
    MANAGER = "Yönetici",
}

export interface User {
    fullName: string,
    email: string,
    password: string,
    phoneNumber: string,
    role: Roles,
    lastEntry?: Date
    lastExit?: Date,
    company: Types.ObjectId
}