import { IsNotEmpty, IsNumber, IsString } from "class-validator"
import { PaymentType } from "../interface/order.interface"

export class UpdateOrderDto {
    @IsString()
    @IsNotEmpty()
    status: string

    @IsNotEmpty()
    @IsNumber()
    totalAmount:number

    @IsString()
    @IsNotEmpty()
    paymentType: PaymentType
}