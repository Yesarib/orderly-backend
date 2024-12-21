import { IsNotEmpty, IsString } from "class-validator";

export class UpdateRegionDto {
    @IsNotEmpty()
    @IsString()
    name: string
}