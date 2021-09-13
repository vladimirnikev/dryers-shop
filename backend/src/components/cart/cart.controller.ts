import { DeleteResult } from 'typeorm';
import { IncrementItemRecordQuantityDto } from './dto/incrementItemRecordQuantity.dto';
import { ExpressRequestInterface } from '@app/common/types/expressRequest.interface';
import { CartEntity } from './entities/cart.entity';
import { CartService } from './cart.service';
import { Controller, Get, Param, Req, Session, Put, Body, Res, Delete } from '@nestjs/common';
import { User } from '../user/decorators/user.decorator';
import { Request, Response } from "express";
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
    ): Promise<CartEntity> {
        return this.cartService.deleteRecord(sessionId, dto)
    }

    @Put('add')
    async incrementItemRecordQuantity(
        @SessionId() sessionId: string,
        @Body() dto: IncrementItemRecordQuantityDto
    ): Promise<CartEntity> {
        return await this.cartService.incrementRecord(sessionId, dto.itemRecordId)
    }

    @Delete('add')
    async decrementItemRecordQuantity(
        @SessionId() sessionId: string,
        @Body() dto: IncrementItemRecordQuantityDto
    ): Promise<CartEntity> {
        return await this.cartService.decrementRecord(sessionId, dto.itemRecordId)
    }
}
