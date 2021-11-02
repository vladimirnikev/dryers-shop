import { ItemRecordEntity } from './../cart/entities/itemRecord.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { DryerEntity } from './entities/dryer.entity';
import { DryerController } from './dryer.controller';
import { DryerService } from './dryer.service';

@Module({
    imports: [TypeOrmModule.forFeature([DryerEntity, ItemRecordEntity])],
    controllers: [DryerController],
    providers: [DryerService]
})
export class DryerModule { }
