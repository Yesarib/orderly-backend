import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateProductDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;
    
    @IsNumber()
    @IsNotEmpty()
    readonly price: number;
    
    @IsString()
    @IsNotEmpty()
    readonly unit: string;
    
    @IsString()
    @IsNotEmpty()
    readonly category: string;
}