import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt/jwt-auth.guard';
import { CompanyModule } from './company/company.module';
import { RegionModule } from './region/region.module';
import { TableModule } from './table/table.module';
import { CategoryModule } from './category/category.module';
import { RoleModule } from './role/role.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.DB_URL, {
      dbName:'orderly'
    }),
    UserModule,
    AuthModule,
    CompanyModule,
    RegionModule,
    TableModule,
    CategoryModule,
    RoleModule,
    AuthorizationModule,
    ProductModule
  ],
  controllers: [AppController, UserController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
  ],
})
export class AppModule { }
