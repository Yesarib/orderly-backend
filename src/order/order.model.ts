import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose'
import { Order, PaymentType } from "./interface/order.interface";

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class OrderModel extends Document implements Order {

    @Prop({ required: true, type: Types.ObjectId, ref: 'RegionModel' })
    regionId: Types.ObjectId;

    @Prop({ required: true, type: Types.ObjectId, ref: 'TableModel' })
    tableId: Types.ObjectId;

    @Prop({ required: true, type: [{ productId: { type: Types.ObjectId, ref: 'ProductModel' }, quantity: Number }] })
    items: {
        productId: Types.ObjectId,
        quantity: number
    }[];

    @Prop({ required: true, default: 'pending' })
    status: string;

    @Prop({ required: false })
    totalAmount: number;

    @Prop({ required: false })
    paymentType: PaymentType;
}

export const OrderSchema = SchemaFactory.createForClass(OrderModel)