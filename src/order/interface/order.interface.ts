import { Types } from "mongoose";

export interface Items {
    productId: Types.ObjectId,
    quantity: number
}

export enum PaymentType {
    CASH = "nakit",
    CREDIT_CARD = "kredi kartı",
    UNKNOWN = "bilinmiyor"
}

export interface Order {
    regionId: Types.ObjectId,
    tableId: Types.ObjectId,
    items: Items[],
    status:string,
    totalAmount:number,
    paymentType: PaymentType
}