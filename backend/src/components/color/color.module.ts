import { Module } from '@nestjs/common';
import { ColorService } from './color.service';
import { ColorController } from './color.controller';
import { ColorEntity } from './entities/color.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ColorEntity])],
  providers: [ColorService],
  controllers: [ColorController],
})
export class ColorModule {}
