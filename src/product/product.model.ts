import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose'
import { Product } from "./interface/product";

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class ProductModel extends Document implements Product {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    unit: string;

    @Prop({ required: true, type: Types.ObjectId, ref: 'CategoryModel' })
    category: Types.ObjectId;

    @Prop({ required: true, type: Types.ObjectId, ref: 'CompanyModel' })
    company: Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(ProductModel);