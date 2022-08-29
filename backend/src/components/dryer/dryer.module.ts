import { ColorEntity } from '../color/entities/color.entity';
import { ItemRecordEntity } from './../cart/entities/itemRecord.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { DryerEntity } from './entities/dryer.entity';
import { DryerController } from './dryer.controller';
import { DryerService } from './dryer.service';
import { CloudinaryModule } from '@app/modules/cloudinary/cloudinary.module';
import { ManufacturerEntity } from '../manufacturer/entities/manufacturer.entity';
import { ColorService } from '../color/color.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DryerEntity, ItemRecordEntity, ManufacturerEntity, ColorEntity]),
    CloudinaryModule,
  ],
  controllers: [DryerController],
  providers: [DryerService, ColorService],
})
export class DryerModule {}
