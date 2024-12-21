import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose'
import { Table } from "./interface/table.interface";

export type TableDocument = Table & Document

@Schema({ timestamps: true })
export class TableModel extends Document implements Table {
    @Prop({
        required: true
    })
    name: string;

    @Prop({
        required: true,
        ref: 'RegionModel',
        type: Types.ObjectId,
    })
    region: Types.ObjectId;
}

export const TableSchema = SchemaFactory.createForClass(TableModel);