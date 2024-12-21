import { Types } from "mongoose";
import { Table } from "../interface/table.interface";
import { IsNotEmpty, IsString } from "class-validator";

export class TableDto implements Table {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsString()
    region: Types.ObjectId;
}