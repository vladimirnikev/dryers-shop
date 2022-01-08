import { CartEntity } from '@app/components/cart/entities/cart.entity';
import { AuthGuard } from '@app/components/user/guards/auth.guard';
import { AdminGuard } from '@app/components/user/guards/admin.guard';
import { MakeOrderDto } from './dto/makeOrder.dto';
import { IncrementItemRecordQuantityDto } from './dto/incrementItemRecordQuantity.dto';
import { CartService } from './cart.service';
import { Controller, Get, Put, Body, Res, Delete, Post, UseGuards, Query } from '@nestjs/common';
import { Response } from "express";
import { SessionId } from '../user/decorators/session.decorator';
import { AddItemToCartDto } from './dto/addItemToCart.dto';
@Controller('cart')
export class CartController {
    constructor(
        private cartService: CartService
    ) { }

    @Get()
    async getCart(
        @Res({ passthrough: true }) res: Response,
        @SessionId() sessionId: string,
    ): Promise<CartEntity> {
        return await this.cartService.getCartBySessionId(sessionId)
    }

    @Put()
    async updateCart(
        @SessionId() sessionId: string,
        @Body() dto: AddItemToCartDto
    ): Promise<CartEntity> {
        return await this.cartService.addItemToCart(sessionId, dto)
    }

    @Delete()
    async deleteItemRecord(
        @SessionId() sessionId: string,
        @Body() dto: IncrementItemRecordQuantityDto
    ): Promise<void> {
        return this.cartService.deleteRecord(sessionId, dto)
    }

    @Put('add')
    async incrementItemRecordQuantity(
        @SessionId() sessionId: string,
        @Body() dto: IncrementItemRecordQuantityDto
    ): Promise<void> {
        return await this.cartService.incrementRecord(sessionId, dto.itemRecordId)
    }

    @Delete('add')
    async decrementItemRecordQuantity(
        @SessionId() sessionId: string,
        @Body() dto: IncrementItemRecordQuantityDto
    ): Promise<void> {
        return await this.cartService.decrementRecord(sessionId, dto.itemRecordId)
    }

    @Get('order')
    @UseGuards(AuthGuard, AdminGuard)
    async getOrders(
        @Query() query: any
    ): Promise<CartEntity[]> {
        return await this.cartService.getOrders(query)
    }

    @Post('order')
    async makeOrder(
        @SessionId() sessionId: string,
        @Body() dto: MakeOrderDto
    ) {
        await this.cartService.makeOrder(sessionId, dto)
    }
}
