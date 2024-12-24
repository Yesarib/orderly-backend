import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductModel } from './product.model';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(ProductModel.name) private productModel: Model<ProductModel>
    ) { }

    async createProduct(product: CreateProductDto): Promise<ProductModel> {
        const newProduct = await new this.productModel(product).save();
        return newProduct;
    }

    async getProducts(): Promise<ProductModel[]> {
        const products = await this.productModel.find();
        return products;
    }

    async getProductById(productId: string): Promise<ProductModel> {
        const product = await this.productModel.findById(productId);

        if (!product) {
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        }

        return product
    }

    async getProductsByCategory(category: string): Promise<ProductModel[]> {
        const products = await this.productModel.find({ category: category });

        return products;
    }

    async getProductsByCompany(company: string): Promise<ProductModel[]> {
        const products = await this.productModel.find({ company: company });

        return products;
    }

    async updateProduct(productId: string, product: UpdateProductDto): Promise<ProductModel> {
        const updatedProduct = await this.productModel.findByIdAndUpdate(productId, product, { new: true });

        if (!updatedProduct) {
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        }

        return updatedProduct
    }

    async deleteProduct(productId: string): Promise<any> {
        const deletedProduct = await this.productModel.findByIdAndDelete(productId);

        if (!deletedProduct) {
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        }

        return { message: 'Product deleted successfully' };
    }

}