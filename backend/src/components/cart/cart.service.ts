import { MakeOrderDto } from './dto/makeOrder.dto';
import { IncrementItemRecordQuantityDto } from './dto/incrementItemRecordQuantity.dto';
import { CartEntity } from '@app/components/cart/entities/cart.entity';
import { ItemRecordEntity } from './entities/itemRecord.entity';
import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { Repository, getRepository } from 'typeorm';
import { AddItemToCartDto } from './dto/addItemToCart.dto';
import { CHAT_ID } from '@app/config';
import { TelegramService } from '@app/modules/telegram/telegram.service';


@Injectable()
export class CartService {
    constructor(
        @InjectRepository(CartEntity)
        private cartRepository: Repository<CartEntity>,
        @InjectRepository(ItemRecordEntity)
        private itemRecordRepository: Repository<ItemRecordEntity>,
        private telegramService: TelegramService
    ) { }

    async createCartForUser(): Promise<CartEntity> {
        const cart = new CartEntity()
        return await this.cartRepository.save(cart)
    }

    async getCartBySessionId(sessionId: string): Promise<CartEntity> {
        let cart = await this.cartRepository.findOne({ sessionId }, {
            relations: ['itemRecords', 'itemRecords.item']
        })
        if (!cart) {
            const newCart = new CartEntity()
            newCart.sessionId = sessionId
            await this.cartRepository.save(newCart)
            cart = await this.cartRepository.findOne({ sessionId }, {
                relations: ['itemRecords', 'itemRecords.item']
            })
        }
        return cart
    }

    async addItemToCart(sessionId: string, dto: AddItemToCartDto): Promise<CartEntity> {
        let cart = await this.getCartBySessionId(sessionId)
        let itemRecord: ItemRecordEntity

        if (!cart.itemRecords.length) {
            itemRecord = await this.createItemRecord(dto, cart)
        } else {
            const idx = cart.itemRecords.findIndex(el => el.item.id === dto.item && el.color === dto.color)
            if (idx < 0) {
                itemRecord = await this.createItemRecord(dto, cart)
            } else {
                itemRecord = cart.itemRecords[idx]
                itemRecord.count++
                await this.itemRecordRepository.save(itemRecord)
            }
        }
        cart.totalSum += itemRecord.item.price
        return await this.cartRepository.save(cart)
    }

    async createItemRecord(dto: AddItemToCartDto, cart: CartEntity): Promise<ItemRecordEntity> {
        let itemRecord = new ItemRecordEntity()
        Object.assign(itemRecord, dto)
        itemRecord = await this.itemRecordRepository.save(itemRecord)
        itemRecord = await this.itemRecordRepository.findOne({ id: itemRecord.id })
        cart.itemRecords.push(itemRecord)
        return itemRecord
    }

    async incrementRecord(sessionId: string, itemRecordId: number): Promise<void> {
        let cart = await this.getCartBySessionId(sessionId)
        const record = cart.itemRecords.find(e => e.id === itemRecordId)
        record.count++
        cart.totalSum += record.item.price

        await this.itemRecordRepository.save(record)
        await this.cartRepository.save(cart)
    }

    async decrementRecord(sessionId: string, itemRecordId: number): Promise<void> {
        let cart = await this.getCartBySessionId(sessionId)
        const record = cart.itemRecords.find(e => e.id === itemRecordId)
        record.count--
        cart.totalSum -= record.item.price

        await this.itemRecordRepository.save(record)
        await this.cartRepository.save(cart)
    }

    async deleteRecord(sessionId: string, dto: IncrementItemRecordQuantityDto): Promise<void> {
        const itemRecord = await this.itemRecordRepository.findOne(dto.itemRecordId)
        await this.itemRecordRepository.delete(dto.itemRecordId)

        const cart = await this.getCartBySessionId(sessionId)
        cart.totalSum -= (itemRecord.count * itemRecord.item.price)

        await this.cartRepository.save(cart)
    }

    async makeOrder(sessionId: string, dto: MakeOrderDto) {
        const cart = await this.cartRepository.findOne({ sessionId }, { relations: ['itemRecords'] })
        if (!cart) {
            throw new HttpException('Cart does not exist', HttpStatus.NOT_FOUND)
        }
        Object.assign(cart, dto)
        cart.isOrdered = true
        cart.sessionId = null
        const order = await this.cartRepository.save(cart)
        if (!order) {
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
        }
        this.telegramService.tgBot.sendMessage(CHAT_ID, this.telegramService.makeMessageAboutOrder(order))
    }

    async getOrders(query: any): Promise<CartEntity[]> {
        const queryBuilder = await getRepository(CartEntity)
            .createQueryBuilder('cart')
            .andWhere('cart.isOrdered = true')

        if (query.minDate && query.maxDate) {
            queryBuilder.andWhere('cart.updatedAt BETWEEN :minDate and :maxDate', {
                minDate: query.minDate,
                maxDate: query.maxDate
            })
        }

        return await queryBuilder.getMany()
    }


    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async deleteExpiredCarts() {
        const thirtyDaysBeforeCurrentDate = dayjs().utc().local().subtract(30, 'day').format()
        try {
            const cartsForDeleting = await getRepository(CartEntity)
                .createQueryBuilder('cart')
                .andWhere('cart.createdAt < :date', { date: thirtyDaysBeforeCurrentDate })
                .andWhere('cart.updatedAt < :date', { date: thirtyDaysBeforeCurrentDate })
                .andWhere('cart.isOrdered = :isOrdered', { isOrdered: false })
                .getMany()

            cartsForDeleting.map(cart => cart.id).forEach(id => {
                this.itemRecordRepository.delete({ cart: id })
                this.cartRepository.delete({ id })
            })
        } catch (error) {
            console.log(error)
        }
    }
}
