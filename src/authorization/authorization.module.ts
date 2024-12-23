import { Module } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { AuthorizationController } from './authorization.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorizationModel, AuthorizationSchema } from './authorzation.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: AuthorizationModel.name, schema: AuthorizationSchema }])
  ],
  providers: [AuthorizationService],
  controllers: [AuthorizationController]
})
export class AuthorizationModule { }
