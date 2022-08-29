import { CartEntity } from '@app/components/cart/entities/cart.entity';
import { AdminGuard } from '@app/components/user/guards/admin.guard';
import { MakeOrderDto } from './dto/makeOrder.dto';
import { IncrementItemRecordQuantityDto } from './dto/incrementItemRecordQuantity.dto';
import { CartService } from './cart.service';
import {
  Controller,
  Get,
  Put,
  Body,
  Res,
  Delete,
  Post,
  UseGuards,
  Query,
  Param,
} from '@nestjs/common';
import { Response } from 'express';
import { SessionId } from '../user/decorators/session.decorator';
import { AddItemToCartDto } from './dto/addItemToCart.dto';
import { JwtAuthGuard } from '@app/modules/auth/guards/jwt-auth.guard';
import { ItemRecordEntity } from './entities/itemRecord.entity';
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  async getCart(
    @Res({ passthrough: true }) res: Response,
    @SessionId() sessionId: string,
  ): Promise<{ totalSum: number; itemRecords: ItemRecordEntity[] }> {
    const cart = await this.cartService.getCartBySessionId(sessionId);
    return { totalSum: cart.totalSum, itemRecords: cart.itemRecords };
  }

  @Put()
  async updateCart(
    @SessionId() sessionId: string,
    @Body() dto: AddItemToCartDto,
  ): Promise<{ totalSum: number; itemRecords: ItemRecordEntity[] }> {
    return await this.cartService.addItemToCart(sessionId, dto);
  }

  @Delete(':recordId')
  async deleteItemRecord(
    @SessionId() sessionId: string,
    @Param('recordId') id: number,
  ): Promise<void> {
    return this.cartService.deleteRecord(sessionId, id);
  }

  @Put('add')
  async incrementItemRecordQuantity(
    @SessionId() sessionId: string,
    @Body() dto: IncrementItemRecordQuantityDto,
  ): Promise<{ totalSum: number; itemRecords: ItemRecordEntity[] }> {
    return await this.cartService.incrementRecord(sessionId, dto.itemRecordId);
  }

  @Delete('add/:recordId')
  async decrementItemRecordQuantity(
    @SessionId() sessionId: string,
    @Param('recordId') id: number,
  ): Promise<{ totalSum: number; itemRecords: ItemRecordEntity[] }> {
    return await this.cartService.decrementRecord(sessionId, id);
  }

  @Get('order')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async getOrders(@Query() query: any): Promise<CartEntity[]> {
    return await this.cartService.getOrders(query);
  }

  @Post('order')
  async makeOrder(@SessionId() sessionId: string, @Body() dto: MakeOrderDto) {
    await this.cartService.makeOrder(sessionId, dto);
  }
}
