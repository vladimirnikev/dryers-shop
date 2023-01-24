import { FileInterceptor } from '@nestjs/platform-express';
import { ManufacturerService } from './manufacturer.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ManufacturerEntity } from './entities/manufacturer.entity';
import { DeleteResult } from 'typeorm';
import { AdminGuard } from '../user/guards/admin.guard';
import { JwtAuthGuard } from '@app/modules/auth/guards/jwt-auth.guard';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '@app/common/helpers/fileUploading';

@Controller('manufacturers')
export class ManufacturerController {
  constructor(private manufacturerService: ManufacturerService) {}

  @Get()
  getAll(): Promise<ManufacturerEntity[]> {
    return this.manufacturerService.getAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  create(@Body() dto, @UploadedFile() file): Promise<ManufacturerEntity> {
    return this.manufacturerService.create(dto, file);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  update(@Body() dto, @Param('id') id, @UploadedFile() file): Promise<ManufacturerEntity> {
    return this.manufacturerService.update(dto, id, file);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  delete(@Param('id') id): Promise<DeleteResult> {
    return this.manufacturerService.delete(id);
  }
}
