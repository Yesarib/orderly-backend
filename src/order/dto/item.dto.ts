import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Types } from "mongoose";

export class ItemDto {
    @IsString()
    @IsNotEmpty()
    productId: Types.ObjectId
    
    @IsNumber()
    @IsNotEmpty()
    quantity: number
}