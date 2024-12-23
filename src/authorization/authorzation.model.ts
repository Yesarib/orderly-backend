import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose'
import { Authorization } from "./interface/authorization.interface";

export type AuthorizationDocument = Authorization & Document

@Schema({ timestamps: true })
export class AuthorizationModel extends Document implements Authorization {
    @Prop({
        required: true,
        unique: true
    })
    title: string;

    @Prop({
        required: true
    })
    authorizations: string[];
}

export const AuthorizationSchema = SchemaFactory.createForClass(AuthorizationModel);