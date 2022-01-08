import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '@app/components/user/user.module';
import { CartModule } from './components/cart/cart.module';
import { OrderModule } from './components/order/order.module';
import { CallModule } from './components/call/call.module';
import { ReviewModule } from './components/review/review.module';
import { DryerModule } from './components/dryer/dryer.module';
import ormconfig from '@app/ormconfig'
import { ScheduleModule } from '@nestjs/schedule';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { ManufacturerModule } from './components/manufacturer/manufacturer.module';
import { ColorModule } from './components/color/color.module';
import { AuthModule } from './modules/auth/auth.module';
import { TelegramModule } from './modules/telegram/telegram.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig),
  ScheduleModule.forRoot(),
    UserModule,
    CartModule,
    OrderModule,
    CallModule,
    ReviewModule,
    DryerModule,
    CloudinaryModule,
    ManufacturerModule,
    ColorModule,
    AuthModule,
    TelegramModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
