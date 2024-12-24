import { Types } from "mongoose";

export interface Product {
    name: string;
    price: number;
    unit: string;
    category: Types.ObjectId;
    company: Types.ObjectId;
}