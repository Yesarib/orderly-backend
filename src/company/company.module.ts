import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyModel, CompanySchema } from './company.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CompanyModel.name, schema: CompanySchema }])
  ],
  controllers: [CompanyController],
  providers: [CompanyService]
})
export class CompanyModule { }
