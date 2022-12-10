import { CloudinaryModule } from '@app/modules/cloudinary/cloudinary.module';
import { ManufacturerEntity } from './entities/manufacturer.entity';
import { Module } from '@nestjs/common';
import { ManufacturerService } from './manufacturer.service';
import { ManufacturerController } from './manufacturer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ManufacturerEntity]), CloudinaryModule],
  providers: [ManufacturerService],
  controllers: [ManufacturerController],
})
export class ManufacturerModule {}
