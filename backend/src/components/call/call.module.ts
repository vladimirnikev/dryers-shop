import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { CallEntity } from './entities/call.entity';
import { CallController } from './call.controller';
import { CallService } from './call.service';

@Module({
    imports: [TypeOrmModule.forFeature([CallEntity])],
    controllers: [CallController],
    providers: [CallService]
})
export class CallModule { }
