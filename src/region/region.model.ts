import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose'
import { Region } from "./interface/region.interface";

export type RegionDocument = Region & Document

@Schema({ timestamps: true })
export class RegionModel extends Document implements Region {
    @Prop({ required: true })
    name: string;

    @Prop({
        ref: 'CompanyModel',
        type: Types.ObjectId,
        required: true
    })
    company: Types.ObjectId;
}

export const RegionSchema = SchemaFactory.createForClass(RegionModel)