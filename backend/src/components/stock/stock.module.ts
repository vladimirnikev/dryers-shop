import { CloudinaryModule } from '@app/modules/cloudinary/cloudinary.module';
import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockEntity } from './entities/stock.entity';
import { DryerEntity } from '../dryer/entities/dryer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StockEntity, DryerEntity]), CloudinaryModule],
  providers: [StockService],
  controllers: [StockController],
})
export class StockModule {}
