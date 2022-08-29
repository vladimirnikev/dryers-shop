import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CallService } from './call.service';
import { CallEntity } from './entities/call.entity';
import { CreateCallDto } from './dto/createCall.dto';
import { AdminGuard } from '@app/components/user/guards/admin.guard';
import { JwtAuthGuard } from '@app/modules/auth/guards/jwt-auth.guard';

@Controller('calls')
export class CallController {
  constructor(private callService: CallService) {}

  @Get()
  @UseGuards(JwtAuthGuard, AdminGuard)
  async getCalls(): Promise<CallEntity[]> {
    return await this.callService.getCalls();
  }

  @Post()
  async createCall(@Body() dto: CreateCallDto): Promise<void> {
    return await this.callService.createCall(dto);
  }
}
