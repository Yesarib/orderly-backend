import { Types } from "mongoose";

export interface Region {
    name: string,
    company: Types.ObjectId
}