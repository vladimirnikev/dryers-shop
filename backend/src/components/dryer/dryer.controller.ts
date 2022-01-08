import { IGetProductsQuery } from './../../common/interfaces/get-products-query.interface';
import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards, Put, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { DryerEntity } from '@app/components/dryer/entities/dryer.entity';
import { AuthGuard } from '@app/components/user/guards/auth.guard';
import { DryerService } from '@app/components/dryer/dryer.service';
import { AdminGuard } from '@app/components/user/guards/admin.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { DeleteImageDto } from './dto/deleteImage.dto';
import { ColorService } from '../color/color.service';
import { JwtAuthGuard } from '@app/modules/auth/guards/jwt-auth.guard';

@Controller('products')
export class DryerController {
    constructor(
        private dryerService: DryerService,
        private colorService: ColorService
    ) { }

    @Get()
    // @UseGuards(JwtAuthGuard)
    @UseGuards(AuthGuard)
    async getDryers(
        @Query() query: IGetProductsQuery,
    ): Promise<{ data: DryerEntity[], totalCount: number }> {
        return await this.dryerService.getDryers(query)
    }

    @Get(':id')
    async getOneDryer(
        @Param('id') id: number
    ): Promise<DryerEntity> {
        return await this.dryerService.getOneDryer(id)
    }

    @Post()
    @UseGuards(AuthGuard, AdminGuard)
    @UseInterceptors(FilesInterceptor('files'))
    async createDryer(
        @Body() dto,
        @UploadedFiles() files
    ): Promise<DryerEntity> {
        return await this.dryerService.createDryer(dto, files)
    }

    @Put(':id')
    @UseGuards(AuthGuard, AdminGuard)
    @UseInterceptors(FilesInterceptor('files'))
    async updateDryer(
        @Param('id') id: number,
        @Body() dto,
        @UploadedFiles() files
    ): Promise<DryerEntity> {
        return await this.dryerService.updateDryer(dto, files, id)
    }

    @Delete(':id')
    @UseGuards(AuthGuard, AdminGuard)
    async deleteDryer(
        @Param('id') id: number
    ): Promise<DeleteResult> {
        return await this.dryerService.deleteDryer(id)
    }

    @Put(':id/image')
    @UseGuards(AuthGuard, AdminGuard)
    async deleteImage(
        @Body() dto: DeleteImageDto,
        @Param('id') productId: number
    ): Promise<DryerEntity> {
        return await this.dryerService.deleteImage(productId, dto.imageUrl)
    }
}
