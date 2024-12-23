import { Types } from "mongoose"


export interface User {
    fullName: string,
    email: string,
    password: string,
    phoneNumber: string,
    role: Types.ObjectId,
    lastEntry?: Date
    lastExit?: Date,
    company: Types.ObjectId
}