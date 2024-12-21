import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/createCompany.dto';
import { ApiResponseDto } from 'src/common/dto/response.dto';
import { UpdateCompanyDto } from './dto/updateCompnay.dto';

@Controller('company')
export class CompanyController {
    constructor(
        private readonly companyService: CompanyService
    ) { }

    @Post()
    @HttpCode(201)
    async createCompany(@Body() createCompanyDto: CreateCompanyDto) {
        const company = await this.companyService.createCompany(createCompanyDto);

        return new ApiResponseDto(true, company)
    }

    @Get()
    async getCompanies() {
        const companies = await this.companyService.getCompanies();

        return new ApiResponseDto(true, companies)
    }

    @Get(':userId')
    async getCompanyById(@Param('userId') userId:string) {
        const company = await this.companyService.getCompanyById(userId);

        return new ApiResponseDto(true, company)
    }

    @Put(':userId')
    async updateCompany(@Param('userId') userId:string, @Body() updateCompanyDto: UpdateCompanyDto) {
        const company = await this.companyService.updateCompany(userId,updateCompanyDto);

        return new ApiResponseDto(true, company)
    }

    @Delete(':userId')
    async deleteCompany(@Param('userId') userId:string) {
        const result = await this.companyService.deleteCompany(userId);

        return new ApiResponseDto(true, result)
    }
}
