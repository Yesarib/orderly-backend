import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { User } from "../interface/user.interface";
import { Types } from "mongoose";

export class CreateUserDto implements User {
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsPhoneNumber('TR')
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