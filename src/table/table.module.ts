import { Module } from '@nestjs/common';
import { TableService } from './table.service';
import { TableController } from './table.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TableModel, TableSchema } from './table.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TableModel.name, schema: TableSchema }])
  ],
  providers: [TableService],
  controllers: [TableController]
})
export class TableModule { }
