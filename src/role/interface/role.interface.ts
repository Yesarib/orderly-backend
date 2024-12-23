import { Types } from "mongoose";

export enum Roles {
    WAITER = "Garson",
    KITCHEN = "Mutfak",
    CHECKOUT = "Kasa",
    MANAGER = "Yönetici",
}

export interface Role {
    name: string,
    authorizations: Types.ObjectId[]
}
