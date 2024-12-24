import { Controller, Delete, Get, HttpCode, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/createProduct.dto';
import { ApiResponseDto } from 'src/common/dto/response.dto';

@Controller('product')
export class ProductController {
    constructor(
        private readonly productService: ProductService
    ) { }

    @Post()
    @HttpCode(201)
    async createProduct(createProductDto: CreateProductDto) {
        const product = await this.productService.createProduct(createProductDto);

        return new ApiResponseDto(true, product)
    }

    @Get()
    async getProducts() {
        const products = await this.productService.getProducts();

        return new ApiResponseDto(true, products)
    }

    @Get(':productId')
    async getProductById(productId: string) {
        const product = await this.productService.getProductById(productId);

        return new ApiResponseDto(true, product)
    }

    @Get('category/:category')
    async getProductsByCategory(category: string) {
        const products = await this.productService.getProductsByCategory(category);

        return new ApiResponseDto(true, products)
    }

    @Get('company/:company')
    async getProductsByCompany(company: string) {
        const products = await this.productService.getProductsByCompany(company);

        return new ApiResponseDto(true, products)
    }

    @Put(':productId')
    async updateProduct(productId: string, createProductDto: CreateProductDto) {
        const updatedProduct = await this.productService.updateProduct(productId, createProductDto);

        return new ApiResponseDto(true, updatedProduct)
    }

    @Delete(':productId')
    @HttpCode(204)
    async deleteProduct(productId: string) {
        await this.productService.deleteProduct(productId);
    }
}
