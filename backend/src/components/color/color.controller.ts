import { ColorService } from './color.service';
import { Controller, Get, Post, UseGuards, Body, Put, Param, Delete } from '@nestjs/common';
import { ColorEntity } from './entities/color.entity';
import { AdminGuard } from '../user/guards/admin.guard';
import { CreateColorDto } from './dto/createColor.dto';
import { DeleteResult } from 'typeorm';
import { JwtAuthGuard } from '@app/modules/auth/guards/jwt-auth.guard';

@Controller('colors')
export class ColorController {
  constructor(private colorService: ColorService) {}

  @Get()
  getAllColors(): Promise<ColorEntity[]> {
    return this.colorService.getAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  createColor(@Body() dto: CreateColorDto): Promise<ColorEntity> {
    return this.colorService.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  updateColor(@Body() dto: CreateColorDto, @Param() id): Promise<ColorEntity> {
    return this.colorService.update(dto, id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  deleteColor(@Param() id): Promise<DeleteResult> {
    return this.colorService.delete(id);
  }
}
