import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe, HttpException } from '@nestjs/common';

import { CallService } from './call.service';
import { CallEntity } from './entities/call.entity';
import { CreateCallDto } from './dto/createCall.dto';
import { AuthGuard } from '@app/components/user/guards/auth.guard';
import { AdminGuard } from '@app/components/user/guards/admin.guard';

@Controller('calls')
export class CallController {
    constructor(
        private callService: CallService
    ) { }

    @Get()
    @UseGuards(AuthGuard, AdminGuard)
    async getCalls(): Promise<CallEntity[]> {
        return await this.callService.getCalls()
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async createCall(
        @Body() dto: CreateCallDto
    ): Promise<HttpException> {
        return await this.callService.createCall(dto)
    }
}
