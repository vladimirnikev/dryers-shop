import { IncrementItemRecordQuantityDto } from './dto/incrementItemRecordQuantity.dto';
import { CartEntity } from '@app/components/cart/entities/cart.entity';
import { ItemRecordEntity } from './entities/itemRecord.entity';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { Repository, getConnection, getRepository, DeleteResult } from 'typeorm';
import { AddItemToCartDto } from './dto/addItemToCart.dto';


@Injectable()
export class CartService {
    constructor(
        @InjectRepository(CartEntity)
        private cartRepository: Repository<CartEntity>,
        @InjectRepository(ItemRecordEntity)
        private itemRecordRepository: Repository<ItemRecordEntity>,
    ) { }

    // async createCartForUser(): Promise<CartEntity> {
    //     const cart = new CartEntity()
    //     return await this.cartRepository.save(cart)
    // }

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

    async addItemToCart(sessionId: string, dto: AddItemToCartDto) {
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
        itemRecord = await this.itemRecordRepository.findOne({ id: itemRecord.id },
            { relations: ['item'] })
        cart.itemRecords.push(itemRecord)
        return itemRecord
    }

    async incrementRecord(sessionId: string, itemRecordId: number): Promise<CartEntity> {
        let cart = await this.getCartBySessionId(sessionId)
        const record = cart.itemRecords.find(e => e.id === itemRecordId)
        record.count++
        cart.totalSum += record.item.price

        await this.itemRecordRepository.save(record)
        return await this.cartRepository.save(cart)
    }

    async decrementRecord(sessionId: string, itemRecordId: number): Promise<CartEntity> {
        let cart = await this.getCartBySessionId(sessionId)
        const record = cart.itemRecords.find(e => e.id === itemRecordId)
        record.count--
        cart.totalSum -= record.item.price

        await this.itemRecordRepository.save(record)
        return await this.cartRepository.save(cart)
    }

    async deleteRecord(sessionId: string, dto: IncrementItemRecordQuantityDto): Promise<CartEntity> {
        const itemRecord = await this.itemRecordRepository.findOne(dto.itemRecordId, { relations: ['item'] })
        await this.itemRecordRepository.delete(dto.itemRecordId)

        const cart = await this.getCartBySessionId(sessionId)
        cart.totalSum -= (itemRecord.count * itemRecord.item.price)

        return await this.cartRepository.save(cart)
    }

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async deleteExpiredCarts() {
        const thirtyDaysBeforeCurrentDate = dayjs().utc().local().subtract(30, 'day').format()
        try {
            const cartsForDeleting = await getRepository(CartEntity)
                .createQueryBuilder('cart')
                .where('cart.createdAt < :date', { date: thirtyDaysBeforeCurrentDate })
                .getMany()

            cartsForDeleting.map(cart => cart.id).forEach(id => {
                this.itemRecordRepository.delete({ cart: id })
                this.cartRepository.delete({ id })
            })
            // const result = await getConnection()
            //     .createQueryBuilder()
            //     .delete()
            //     .from(CartEntity)
            //     .where('createdAt < :date', {
            //         date: thirtyDaysBeforeCurrentDate
            //         // date: dayjs().utc().local().format()
            //     })
            //     .execute();

            // await getConnection()
            //     .createQueryBuilder()
            //     .delete().from(ItemRecordEntity)
            //     .where('cartId = :id', {
            //         id:
            //     })
            //     .execute()

            // this.itemRecordRepository.delete({ cartId: })
            // this.cartRepository.delete({})
            // TEST THIS
        } catch (error) {
            console.log(error)
        }
    }
}
