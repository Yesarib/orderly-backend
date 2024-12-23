import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthorizationModel } from './authorzation.model';
import { Model } from 'mongoose';
import { AuthorizationDto } from './dto/authorization.dto';


@Injectable()
export class AuthorizationService {
    constructor(
        @InjectModel(AuthorizationModel.name) private readonly authorizationModel: Model<AuthorizationModel>
    ) { }

    async createAuthorization(authorization: AuthorizationDto): Promise<AuthorizationModel> {
        const newAuthorization = new this.authorizationModel(authorization);
        return newAuthorization.save();
    }

    async getAuthorizationById(id: string): Promise<AuthorizationModel> {
        const authorization = await this.authorizationModel.findById(id);

        if (!authorization) {
            throw new HttpException('Authorization not found', HttpStatus.NOT_FOUND);
        }

        return authorization;
    }

    async getAuthorizations(): Promise<AuthorizationModel[]> {
        return this.authorizationModel.find().exec();
    }

    async updateAuthorization(id: string, authorization: AuthorizationDto): Promise<AuthorizationModel> {
        const updatedAuthorization = await this.authorizationModel.findByIdAndUpdate(id, authorization, { new: true });

        if (!updatedAuthorization) {
            throw new HttpException('Authorization not found', HttpStatus.NOT_FOUND);
        }

        return updatedAuthorization;
    }

    async deleteAuthorization(id: string): Promise<any> {
        const deletedAuthorization = await this.authorizationModel.findByIdAndUpdate(id);

        if (!deletedAuthorization) {
            throw new HttpException('Authorization not found', HttpStatus.NOT_FOUND);
        }

        return { message: 'Authorization deleted successfully' };
    }
}
