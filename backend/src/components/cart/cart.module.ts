import { ItemRecordEntity } from './entities/itemRecord.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CartEntity } from './entities/cart.entity';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { TelegramModule } from '@app/modules/telegram/telegram.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([CartEntity, ItemRecordEntity]),
        TelegramModule
    ],
    controllers: [CartController],
    providers: [CartService],
    exports: [CartService]
})
export class CartModule { }
