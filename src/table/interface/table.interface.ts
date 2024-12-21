import { Types } from "mongoose";

export interface Table {
    name: string,
    region: Types.ObjectId
}