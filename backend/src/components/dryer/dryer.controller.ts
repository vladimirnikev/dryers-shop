import { IGetProductsQuery } from './../../common/interfaces/get-products-query.interface';
import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards, Put, UseInterceptors, UploadedFiles, UploadedFile } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { DryerEntity } from '@app/components/dryer/entities/dryer.entity';
import { AuthGuard } from '@app/components/user/guards/auth.guard';
import { DryerService } from '@app/components/dryer/dryer.service';
import { AdminGuard } from '@app/components/user/guards/admin.guard';
import { CreateDryerDto } from './dto/createDryer.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

@Controller('products')
export class DryerController {
    constructor(
        private dryerService: DryerService
    ) { }

    @Get()
    async getDryers(
        @Query() query: IGetProductsQuery
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
    async createDryer(
        @Body() dto: CreateDryerDto,
        // @UploadedFiles() files
    ): Promise<DryerEntity> {
        // console.log('Path: ', files)
        return await this.dryerService.createDryer(dto)
    }

    @Post('upload')
    @UseGuards(AuthGuard, AdminGuard)
    @UseInterceptors(FilesInterceptor('file', 10, {
        storage: diskStorage({
            destination: './uploads/productimages',
            filename: (req, file, cb) => {
                const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuid()
                const extension: string = path.parse(file.originalname).ext

                cb(null, `${filename}${extension}`)
            }
        })
    }))
    uploadImage(@UploadedFiles() files) {
        console.log('Files: ', files)
        return
    }
    // Controller



    @Put(':id')
    @UseGuards(AuthGuard, AdminGuard)
    async updateDryer(
        @Param('id') id: number,
        @Body() dto: CreateDryerDto
    ): Promise<DryerEntity> {
        return await this.dryerService.updateDryer(dto, id)
    }

    @Delete(':id')
    @UseGuards(AuthGuard, AdminGuard)
    async deleteDryer(
        @Param('id') id: number
    ): Promise<DeleteResult> {
        return await this.dryerService.deleteDryer(id)
    }
}
