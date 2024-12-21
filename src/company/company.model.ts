import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose'
import { Company, WorkType } from "./interface/company.interface";

export type CompanyDocument = Company & Document

@Schema({ timestamps: true })
export class CompanyModel extends Document implements Company {
    @Prop({
        required: true
    })
    name: string;

    @Prop({
        required: true,
        default: '10:00'
    })
    dayStart: string;

    @Prop({
        required: true,
        default: '23:59'
    })
    dayEnd: string;

    @Prop({
        required: false,
        default:'Sound 1'
    })
    notificationSound: string;

    @Prop({
        required: true
    })
    workType: WorkType;

    @Prop({
        required: false,
        default:'localhost:8081'
    })
    socketAddress: string;

    @Prop({
        required: true
    })
    screenLockTime: number;

    @Prop({
        required: true
    })
    changeTableTime: number;

    @Prop({
        required: true
    })
    country: string;

    @Prop({
        required: true
    })
    city: string;

    @Prop({
        required: true
    })
    district: string;

    @Prop({
        required: true
    })
    neighborhood: string;

    @Prop({
        required: true
    })
    street: string;

    @Prop({
        required: true
    })
    no: string;

    @Prop({
        required: true
    })
    address: string;

    @Prop({
        required: true
    })
    zipCode: string;
}

export const CompanySchema = SchemaFactory.createForClass(CompanyModel)