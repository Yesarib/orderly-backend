import { IsArray, IsNotEmpty, IsObject, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateOrderDto {
    @IsString()
    @IsNotEmpty()
    regionId: Types.ObjectId

    @IsString()
    @IsNotEmpty()
    tableId: Types.ObjectId

    @IsArray()
    @IsNotEmpty()
    items: {
        productId: Types.ObjectId,
        quantity: number
    }[]

    @IsString()
    @IsNotEmpty()
    status: string
}