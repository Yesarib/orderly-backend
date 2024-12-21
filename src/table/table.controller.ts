import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { TableService } from './table.service';
import { TableDto } from './dto/table.dto';
import { ApiResponseDto } from 'src/common/dto/response.dto';

@Controller('table')
export class TableController {
    constructor(
        private readonly tableService: TableService
    ) { }

    @Post()
    @HttpCode(201)
    async createTable(@Body() tableDto: TableDto) {
        const table = await this.tableService.createTable(tableDto);

        return new ApiResponseDto(true, table)
    }

    @Get(':tableId')
    async getTableById(@Param('tableId') tableId: string) {
        const table = await this.tableService.getTableById(tableId)

        return new ApiResponseDto(true, table)
    }

    @Get('/region/:regionId')
    async getTablesByRegion(@Param('regionId') regionId: string) {
        const tables = await this.tableService.getTablesByRegion(regionId)

        return new ApiResponseDto(true, tables)
    }

    @Put(':tableId')
    async updateTable(@Param('tableId') tableId: string, @Body() tableDto: TableDto) {
        const table = await this.tableService.updateTable(tableId,tableDto)

        return new ApiResponseDto(true,table)
    }

    @Delete(':tableId')
    @HttpCode(204)
    async deleteTable(@Param('tableId') tableId: string) {
        await this.tableService.deleteTable(tableId)
    }
}
