import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class LoginDto {
    @IsEmail()
    @IsOptional()
    email?: string

    @IsPhoneNumber()
    @IsOptional()
    phoneNumber?: string

    @IsString()
    @IsNotEmpty()
    password: string
}