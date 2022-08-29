import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CallEntity } from './entities/call.entity';
import { CallController } from './call.controller';
import { CallService } from './call.service';
import { TelegramModule } from '@app/modules/telegram/telegram.module';

@Module({
  imports: [TypeOrmModule.forFeature([CallEntity]), TelegramModule],
  controllers: [CallController],
  providers: [CallService],
})
export class CallModule {}
