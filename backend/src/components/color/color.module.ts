import { Module } from '@nestjs/common';
import { ColorService } from './color.service';
import { ColorController } from './color.controller';
import { ColorEntity } from './entities/color.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DryerEntity } from '../dryer/entities/dryer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ColorEntity, DryerEntity])],
  providers: [ColorService],
  controllers: [ColorController],
})
export class ColorModule {}
