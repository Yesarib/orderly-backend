import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/createProduct.dto';
import { ApiResponseDto } from 'src/common/dto/response.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';

@Controller('product')
export class ProductController {
    constructor(
        private readonly productService: ProductService
    ) { }

    @Post()
    @HttpCode(201)
    async createProduct(@Body() createProductDto: CreateProductDto) {
        const product = await this.productService.createProduct(createProductDto);

        return new ApiResponseDto(true, product)
    }

    @Get()
    async getProducts() {
        const products = await this.productService.getProducts();

        return new ApiResponseDto(true, products)
    }

    @Get(':productId')
    async getProductById(@Param('productId') productId: string) {
        const product = await this.productService.getProductById(productId);

        return new ApiResponseDto(true, product)
    }

    @Get('category/:categoryId')
    async getProductsByCategory(@Param('categoryId') category: string) {
        const products = await this.productService.getProductsByCategory(category);

        return new ApiResponseDto(true, products)
    }

    @Get('company/:companyId')
    async getProductsByCompany(@Param('companyId') company: string) {
        const products = await this.productService.getProductsByCompany(company);

        return new ApiResponseDto(true, products)
    }

    @Put(':productId')
    async updateProduct(@Param('productId') productId: string,@Body()  updateProductDto: UpdateProductDto) {
        const updatedProduct = await this.productService.updateProduct(productId, updateProductDto);

        return new ApiResponseDto(true, updatedProduct)
    }

    @Delete(':productId')
    @HttpCode(204)
    async deleteProduct(@Param('productId') productId: string) {
        await this.productService.deleteProduct(productId);
    }
}
