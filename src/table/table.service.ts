import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TableModel } from './table.model';
import { Model } from 'mongoose';
import { TableDto } from './dto/table.dto';

@Injectable()
export class TableService {
    constructor(
        @InjectModel(TableModel.name) private readonly tableModel: Model<TableModel>
    ) { }

    async createTable(tableDto: TableDto): Promise<TableModel> {
        const newTable = await new this.tableModel(tableDto).save();

        return newTable
    }

    async getTableById(tableId: string): Promise<TableModel> {
        const table = await this.tableModel.findById(tableId);

        if (!table) {
            throw new HttpException('Table is not found!', HttpStatus.NOT_FOUND)
        }

        return table
    }

    async getTablesByRegion(regionId: string): Promise<TableModel[]> {
        const tables = await this.tableModel.find({ region: regionId });

        return tables
    }

    async updateTable(tableId: string, tableDto: TableDto): Promise<TableModel> {
        const table = await this.tableModel.findByIdAndUpdate(tableId, tableDto, { new: true })
        
        if (!table) {
            throw new HttpException('Table is not found!', HttpStatus.NOT_FOUND)
        }

        return table
    }

    async deleteTable(tableId: string): Promise<any> {
        const table = await this.tableModel.findByIdAndDelete(tableId);

        if (!table) {
            throw new HttpException('Table is not found!', HttpStatus.NOT_FOUND)
        }

        return table
    }
}
