import { IsNotEmpty, IsString, IsOptional, IsEnum, IsNumber } from "class-validator";
import { WorkType } from "../interface/company.interface";

export class UpdateCompanyDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    dayStart: string;

    @IsString()
    @IsNotEmpty()
    dayEnd: string;

    @IsString()
    @IsOptional()
    notificationSound?: string;

    @IsEnum(WorkType)
    @IsNotEmpty()
    workType: WorkType;

    @IsString()
    @IsOptional()
    socketAddress?: string;

    @IsNumber()
    @IsNotEmpty()
    screenLockTime: number;

    @IsNumber()
    @IsNotEmpty()
    changeTableTime: number;

    @IsString()
    @IsNotEmpty()
    country: string;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    district: string;

    @IsString()
    @IsNotEmpty()
    neighborhood: string;

    @IsString()
    @IsNotEmpty()
    street: string;

    @IsString()
    @IsNotEmpty()
    no: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    zipCode: string;
}
