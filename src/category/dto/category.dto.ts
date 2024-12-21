import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";

export class CategoryDto {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsOptional()
    color: string

    @IsString()
    @IsNotEmpty()
    company: Types.ObjectId
}