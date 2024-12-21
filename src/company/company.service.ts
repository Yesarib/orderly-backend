import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CompanyModel } from './company.model';
import { Model } from 'mongoose';
import { CreateCompanyDto } from './dto/createCompany.dto';
import { UpdateCompanyDto } from './dto/updateCompnay.dto';

@Injectable()
export class CompanyService {
    constructor(
        @InjectModel(CompanyModel.name) private readonly companyModel: Model<CompanyModel>
    ) { }

    async createCompany(createCompanyDto: CreateCompanyDto): Promise<CompanyModel> {
        const newCompany = await new this.companyModel(createCompanyDto).save();

        return newCompany;
    }

    async getCompanies(): Promise<CompanyModel[]> {
        return await this.companyModel.find().exec()
    }

    async getCompanyById(companyId: string): Promise<CompanyModel> {
        const company = await this.companyModel.findById(companyId);

        if (!company) {
            throw new HttpException("Company Not Found", HttpStatus.NOT_FOUND)
        }

        return company;
    }

    async updateCompany(companyId: string, updateCompanyDto: UpdateCompanyDto): Promise<CompanyModel> {
        const company = await this.companyModel.findByIdAndUpdate(companyId, updateCompanyDto, { new: true });

        if (!company) {
            throw new HttpException("Company Not Found", HttpStatus.NOT_FOUND)
        }

        return company;
    }

    async deleteCompany(companyId: string): Promise<any> {
        const company = await this.companyModel.findByIdAndUpdate(companyId);

        if (!company) {
            throw new HttpException("Company Not Found", HttpStatus.NOT_FOUND)
        }

        return { message: "Company successfully deleted" };
    }
}
