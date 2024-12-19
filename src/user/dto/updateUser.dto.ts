import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { Roles, User } from "../interface/user.interface";
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
    role: Roles;

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