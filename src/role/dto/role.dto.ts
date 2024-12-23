import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";

export class RoleDto {
    @IsString()
    @IsNotEmpty()
    name:string

    @IsArray()
    @IsOptional()
    authorizations: Types.ObjectId[]
}