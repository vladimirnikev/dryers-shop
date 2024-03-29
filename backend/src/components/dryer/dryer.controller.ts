import { IGetProductsQuery } from './../../common/interfaces/get-products-query.interface';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  Put,
  UseInterceptors,
  UploadedFiles,
  Res,
  Req,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { DryerEntity } from '@app/components/dryer/entities/dryer.entity';
import { DryerService } from '@app/components/dryer/dryer.service';
import { AdminGuard } from '@app/components/user/guards/admin.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { DeleteImageDto } from './dto/deleteImage.dto';
import { JwtAuthGuard } from '@app/modules/auth/guards/jwt-auth.guard';
import { ProductPriceRange } from '@app/common/interfaces/product-price-range.interface';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '@app/common/helpers/fileUploading';

@Controller('products')
export class DryerController {
  constructor(private dryerService: DryerService) {}

  @Get()
  async getDryers(
    @Query() query: IGetProductsQuery,
  ): Promise<{ data: DryerEntity[]; totalCount: number }> {
    return await this.dryerService.getDryers(query);
  }

  @Get('price-range')
  async getPriceRange(@Query() query: any): Promise<ProductPriceRange> {
    return await this.dryerService.getPriceRange(query);
  }

  @Get('viewed')
  async getViewedProducts(@Req() req) {
    return await this.dryerService.getViewedDryers(req);
  }

  @Get(':id')
  async getOneDryer(
    @Param('id') id: number,
    @Res({ passthrough: true }) res,
    @Req() req,
  ): Promise<DryerEntity> {
    return await this.dryerService.getOneDryer(id, res, req);
  }

  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async createDryer(@Body() dto, @UploadedFiles() files): Promise<DryerEntity> {
    return await this.dryerService.createDryer(dto, files);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async updateDryer(
    @Param('id') id: number,
    @Body() dto,
    @UploadedFiles() files,
  ): Promise<DryerEntity> {
    return await this.dryerService.updateDryer(dto, files, id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async deleteDryer(@Param('id') id: number): Promise<DeleteResult> {
    return await this.dryerService.deleteDryer(id);
  }

  @Put(':id/image')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async deleteImage(
    @Body() dto: DeleteImageDto,
    @Param('id') productId: number,
  ): Promise<DryerEntity> {
    return await this.dryerService.deleteImage(productId, dto.imageUrl);
  }
}
