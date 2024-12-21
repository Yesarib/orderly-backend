import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CategoryModel } from './category.model';
import { CategoryDto } from './dto/category.dto';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel(CategoryModel.name) private readonly categoryModel: Model<CategoryModel>
    ) { }

    async createCategory(categoryDto: CategoryDto): Promise<CategoryModel> {
        const newCategory = await new this.categoryModel(categoryDto).save();

        return newCategory
    }

    async getCategoriesByCompany(companyId: string): Promise<CategoryModel[]> {
        const categories = await this.categoryModel.find({ company: companyId });

        return categories
    }

    async getCategoryById(categoryId: string): Promise<CategoryModel> {
        const category = await this.categoryModel.findById(categoryId)

        if (!category) {
            throw new HttpException('category not found!', HttpStatus.NOT_FOUND)
        }

        return category
    }

    async updateCategory(categoryId: string, categoryDto: CategoryDto): Promise<CategoryModel> {
        const category = await this.categoryModel.findByIdAndUpdate(categoryId, categoryDto, { new: true });

        if (!category) {
            throw new HttpException('category not found!', HttpStatus.NOT_FOUND)
        }

        return category;
    }

    async deleteCategory(categoryId: string): Promise<any> {
        const category = await this.categoryModel.findByIdAndDelete(categoryId);

        if (!category) {
            throw new HttpException('category not found!', HttpStatus.NOT_FOUND)
        }

        return { message: "Category successfully deleted" };
    }
}
