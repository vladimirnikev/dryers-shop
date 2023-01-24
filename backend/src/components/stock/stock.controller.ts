import { editFileName, imageFileFilter } from '@app/common/helpers/fileUploading';
import { StockWithProductIds } from '@app/common/interfaces/stock-with-product-ids.interface';
import { JwtAuthGuard } from '@app/modules/auth/guards/jwt-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AdminGuard } from '../user/guards/admin.guard';
import { StockEntity } from './entities/stock.entity';
import { StockService } from './stock.service';

@Controller('stocks')
export class StockController {
  constructor(private stockService: StockService) {}

  @Get()
  async getStocks(@Query() query): Promise<StockEntity[]> {
    return await this.stockService.getStocks(query);
  }

  @Get(':id')
  async getStock(@Param('id') id: number): Promise<StockWithProductIds> {
    return await this.stockService.getOneStock(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @UseInterceptors(
    FilesInterceptor('files', 2, {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async createStock(@Body() dto, @UploadedFiles() files): Promise<StockEntity> {
    return await this.stockService.createStock(dto, files);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @UseInterceptors(
    FilesInterceptor('files', 2, {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async updateStock(
    @Param('id') id: number,
    @Body() dto,
    @UploadedFiles() files,
  ): Promise<StockEntity> {
    return await this.stockService.updateStock(dto, files, id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async deleteStock(@Param('id') id: number): Promise<{ id: number }> {
    return await this.stockService.deleteStock(id);
  }
}
