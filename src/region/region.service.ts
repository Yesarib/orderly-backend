import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegionModel } from './region.model';
import { Model } from 'mongoose';
import { CreateRegionDto } from './dto/createRegion.dto';
import { UpdateRegionDto } from './dto/updateRegion.dto';

@Injectable()
export class RegionService {
    constructor(
        @InjectModel(RegionModel.name) private readonly regionModel: Model<RegionModel>
    ) { }

    async createRegion(createRegionDto: CreateRegionDto): Promise<RegionModel> {
        const newRegion = await new this.regionModel(createRegionDto).save();

        return newRegion
    }

    async getRegionsByCompany(companyId: string): Promise<RegionModel[]> {
        const regions = await this.regionModel.find({ company: companyId });

        return regions
    }

    async getRegionById(regionId: string): Promise<RegionModel> {
        const region = await this.regionModel.findById(regionId);

        if (!region) {
            throw new HttpException("Company Not Found", HttpStatus.NOT_FOUND)
        }

        return region
    }

    async updateRegion(regionId: string, updateRegionDto: UpdateRegionDto): Promise<RegionModel> {
        const region = await this.regionModel.findByIdAndUpdate(regionId, updateRegionDto, { new: true });

        if (!region) {
            throw new HttpException("Company Not Found", HttpStatus.NOT_FOUND)
        }

        return region
    }

    async deleteRegion(regionId: string): Promise<any> {
        const region = await this.regionModel.findByIdAndDelete(regionId);

        if (!region) {
            throw new HttpException("Company Not Found", HttpStatus.NOT_FOUND)
        }

        return { message: "Region successfully deleted" };
    }

}
