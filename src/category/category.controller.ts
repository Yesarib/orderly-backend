import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
import { ApiResponseDto } from 'src/common/dto/response.dto';

@Controller('category')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService
    ) { }

    @Post()
    @HttpCode(201)
    async createCategory(@Body() categoryDto: CategoryDto) {        
        const category = await this.categoryService.createCategory(categoryDto);

        return new ApiResponseDto(true, category)
    }

    @Get('/company/:companyId')
    async getCategoriesByCompany(@Param('companyId') companyId: string) {
        const categories = await this.categoryService.getCategoriesByCompany(companyId)

        return new ApiResponseDto(true, categories)
    }

    @Get(':categoryId')
    async getCategoryById(@Param('categoryId') categoryId: string) {
        const category = await this.categoryService.getCategoryById(categoryId);

        return new ApiResponseDto(true, category)
    }

    @Put(':categoryId')
    async updateCategory(@Param('categoryId') categoryId: string, @Body() categoryDto: CategoryDto) {
        const category = await this.categoryService.updateCategory(categoryId, categoryDto)

        return new ApiResponseDto(true, category)
    }

    @Delete(':categoryId')
    @HttpCode(204)
    async deleteCategory(@Param('categoryId') categoryId: string) {
        await this.categoryService.deleteCategory(categoryId)
    }
}
