import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { Types } from "mongoose";

export class UpdateUserDto  {
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsPhoneNumber()
    @IsNotEmpty()
    phoneNumber: string;

    @IsNotEmpty()
    @IsString()
    role: Types.ObjectId;

    @IsDate()
    @IsOptional()
    lastEntry?: Date;

    @IsDate()
    @IsOptional()
    lastExit?: Date;

    @IsString()
    @IsNotEmpty()
    company: Types.ObjectId;
}