import { IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateRegionDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    companyId: Types.ObjectId
}