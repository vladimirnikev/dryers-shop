import { ManufacturerService } from './manufacturer.service';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ManufacturerEntity } from './entities/manufacturer.entity';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { DeleteResult } from 'typeorm';
import { AdminGuard } from '../user/guards/admin.guard';
import { JwtAuthGuard } from '@app/modules/auth/guards/jwt-auth.guard';

@Controller('manufacturers')
export class ManufacturerController {
  constructor(private manufacturerService: ManufacturerService) {}

  @Get()
  getAll(): Promise<ManufacturerEntity[]> {
    return this.manufacturerService.getAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  create(@Body() dto: CreateManufacturerDto): Promise<ManufacturerEntity> {
    return this.manufacturerService.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  update(@Body() dto: CreateManufacturerDto, @Param() id): Promise<ManufacturerEntity> {
    return this.manufacturerService.update(dto, id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  delete(@Param() id): Promise<DeleteResult> {
    return this.manufacturerService.delete(id);
  }
}
