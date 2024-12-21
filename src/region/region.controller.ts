import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/createRegion.dto';
import { ApiResponseDto } from 'src/common/dto/response.dto';
import { UpdateRegionDto } from './dto/updateRegion.dto';

@Controller('region')
export class RegionController {
    constructor(
        private readonly regionService: RegionService
    ) { }

    @Post()
    @HttpCode(201)
    async createRegion(@Body() createRegionDto: CreateRegionDto) {
        const region = await this.regionService.createRegion(createRegionDto);

        return new ApiResponseDto(true, region)
    }

    @Get('/company/:companyId')
    async getRegionsByCompany(@Param('companyId') companyId: string) {
        const regions = await this.regionService.getRegionsByCompany(companyId);

        return new ApiResponseDto(true, regions)
    }

    @Get(':regionId')
    async getRegionById(@Param("regionId") regionId: string) {
        const region = await this.regionService.getRegionById(regionId)

        return new ApiResponseDto(true, region)
    }

    @Put(':regionId')
    async updateRegion(@Param("regionId") regionId: string, @Body() updateRegionDto: UpdateRegionDto) {
        const region = await this.regionService.updateRegion(regionId, updateRegionDto)

        return new ApiResponseDto(true, region)
    }

    @Delete(':regionId')
    @HttpCode(204)
    async deleteRegion(@Param("regionId") regionId: string) {
        await this.regionService.deleteRegion(regionId)
    }
}
