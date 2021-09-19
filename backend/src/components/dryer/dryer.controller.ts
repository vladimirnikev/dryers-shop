import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards, UsePipes, ValidationPipe, Put } from '@nestjs/common';
import { DeleteResult } from 'typeorm';

import { DryerEntity } from '@app/components/dryer/entities/dryer.entity';
import { AuthGuard } from '@app/components/user/guards/auth.guard';
import { DryerService } from '@app/components/dryer/dryer.service';
import { AdminGuard } from '@app/components/user/guards/admin.guard';
import { CreateDryerDto } from './dto/createDryer.dto';

@Controller('dryers')
export class DryerController {
    constructor(
        private dryerService: DryerService
    ) { }

    @Get()
    async getDryers(
        @Query() query: any
    ): Promise<DryerEntity[]> {
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
        @Body() dto: CreateDryerDto
    ): Promise<DryerEntity> {
        return await this.dryerService.createDryer(dto)
    }

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
