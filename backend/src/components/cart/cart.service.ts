import { MakeOrderDto } from './dto/makeOrder.dto';
import { CartEntity } from '@app/components/cart/entities/cart.entity';
import { ItemRecordEntity } from './entities/itemRecord.entity';
import { HttpException, Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { Repository, getRepository } from 'typeorm';
import { AddItemToCartDto } from './dto/addItemToCart.dto';
import { TelegramService } from '@app/modules/telegram/telegram.service';
import { flatObject } from '@app/common/helpers/flatObject';
import { MakeOrderInClickDto } from './dto/makeOrderInClick.dto';
import { DryerEntity } from '../dryer/entities/dryer.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
    @InjectRepository(ItemRecordEntity)
    private itemRecordRepository: Repository<ItemRecordEntity>,
    @InjectRepository(DryerEntity)
    private productRepository: Repository<DryerEntity>,
    private telegramService: TelegramService,
  ) {}

  async createCartForUser(): Promise<CartEntity> {
    const cart = new CartEntity();
    return await this.cartRepository.save(cart);
  }

  async getCartBySessionId(sessionId: string): Promise<CartEntity> {
    let cart = await this.cartRepository.findOne({
      where: { sessionId },
      relations: ['itemRecords', 'itemRecords.item'],
    });

    if (!cart) {
      const newCart = new CartEntity();
      newCart.sessionId = sessionId;
      await this.cartRepository.save(newCart);
      cart = await this.cartRepository.findOne({
        where: { sessionId },
        relations: ['itemRecords', 'itemRecords.item'],
      });
    }

    return cart;
  }

  async addItemToCart(
    sessionId: string,
    dto: AddItemToCartDto,
  ): Promise<{ totalSum: number; itemRecords: ItemRecordEntity[] }> {
    const cart = await this.getCartBySessionId(sessionId);
    let itemRecord: ItemRecordEntity;

    if (!cart.itemRecords.length) {
      itemRecord = await this.createItemRecord(dto, cart);
    } else {
      const idx = cart.itemRecords.findIndex((el) => el.item.id === dto.item);
      if (idx < 0) {
        itemRecord = await this.createItemRecord(dto, cart);
      } else {
        itemRecord = cart.itemRecords[idx];
        itemRecord.count = itemRecord.count + dto.count;
        await this.itemRecordRepository.save(itemRecord);
      }
    }

    const changedCart = await this.cartRepository.save(cart);
    const totalSum = changedCart.itemRecords
      .map((item) => item.item.price * item.count)
      .reduce((prev, curr) => prev + curr, 0);

    return {
      totalSum,
      itemRecords: changedCart.itemRecords,
    };
  }

  async createItemRecord(dto: AddItemToCartDto, cart: CartEntity): Promise<ItemRecordEntity> {
    let itemRecord = new ItemRecordEntity();
    Object.assign(itemRecord, dto);
    itemRecord = await this.itemRecordRepository.save(itemRecord);
    itemRecord = await this.itemRecordRepository.findOne({ where: { id: itemRecord.id } });
    cart.itemRecords.push(itemRecord);
    return itemRecord;
  }

  async incrementRecord(
    sessionId: string,
    itemRecordId: number,
  ): Promise<{ totalSum: number; itemRecords: ItemRecordEntity[] }> {
    const cart = await this.getCartBySessionId(sessionId);
    const record = cart.itemRecords.find((e) => e.id === itemRecordId);
    record.count++;

    await this.itemRecordRepository.save(record);
    const changedCart = await this.cartRepository.save(cart);
    const totalSum = changedCart.itemRecords
      .map((item) => item.item.price * item.count)
      .reduce((prev, curr) => prev + curr, 0);

    return {
      totalSum,
      itemRecords: changedCart.itemRecords,
    };
  }

  async decrementRecord(
    sessionId: string,
    itemRecordId: number,
  ): Promise<{ totalSum: number; itemRecords: ItemRecordEntity[] }> {
    const cart = await this.getCartBySessionId(sessionId);
    const record = cart.itemRecords.find((e) => e.id === +itemRecordId);
    if (+record.count === 1) {
      throw new HttpException(`Count can't be less than 1`, HttpStatus.METHOD_NOT_ALLOWED);
    }
    record.count--;

    await this.itemRecordRepository.save(record);
    const changedCart = await this.cartRepository.save(cart);
    const totalSum = changedCart.itemRecords
      .map((item) => item.item.price * item.count)
      .reduce((prev, curr) => prev + curr, 0);

    return {
      totalSum,
      itemRecords: changedCart.itemRecords,
    };
  }

  async deleteRecord(sessionId: string, id: number): Promise<void> {
    await this.itemRecordRepository.delete(id);
  }

  async makeOrder(sessionId: string, dto: MakeOrderDto) {
    const cart = await this.cartRepository.findOne({
      where: { sessionId },
      relations: ['itemRecords'],
    });
    if (!cart) {
      throw new HttpException('Cart does not exist', HttpStatus.NOT_FOUND);
    }

    const structuredDto = flatObject(dto);

    Object.assign(cart, structuredDto);
    cart.isOrdered = true;
    cart.sessionId = null;
    const order = await this.cartRepository.save(cart);
    if (!order) {
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    this.telegramService.tgBot.sendMessage(
      process.env.TELEGRAM_CHAT_ID,
      this.telegramService.makeMessageAboutOrder(order),
    );
  }

  async getOrders(query: any): Promise<CartEntity[]> {
    const queryBuilder = await getRepository(CartEntity)
      .createQueryBuilder('cart')
      .andWhere('cart.isOrdered = true');

    if (query.minDate && query.maxDate) {
      queryBuilder.andWhere('cart.updatedAt BETWEEN :minDate and :maxDate', {
        minDate: query.minDate,
        maxDate: query.maxDate,
      });
    }

    return await queryBuilder.getMany();
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async deleteExpiredCarts() {
    const thirtyDaysBeforeCurrentDate = dayjs().utc().local().subtract(30, 'day').format();
    try {
      const cartsForDeleting = await getRepository(CartEntity)
        .createQueryBuilder('cart')
        .andWhere('cart.createdAt < :date', {
          date: thirtyDaysBeforeCurrentDate,
        })
        .andWhere('cart.updatedAt < :date', {
          date: thirtyDaysBeforeCurrentDate,
        })
        .andWhere('cart.isOrdered = :isOrdered', { isOrdered: false })
        .getMany();

      cartsForDeleting
        .map((cart) => cart.id)
        .forEach((id) => {
          this.itemRecordRepository.delete({ cart: id });
          this.cartRepository.delete({ id });
        });
    } catch (error) {
      console.log(error);
    }
  }

  async makeOrderInClick(sessionId: string, dto: MakeOrderInClickDto): Promise<void> {
    if (dto.productId) {
      const product = await this.productRepository.findOne({ where: { id: dto.productId } });

      if (!product) {
        throw new NotFoundException('Product does not exist');
      }

      const itemDataForMessage = {
        color: product.color?.name,
        name: product.name,
        price: product.price,
      };

      this.telegramService.tgBot.sendMessage(
        process.env.TELEGRAM_CHAT_ID,
        this.telegramService.makeMessageAboutOrderInClick(dto, itemDataForMessage),
      );
      return;
    }

    const cart = await this.cartRepository.findOne({
      where: { sessionId },
      relations: ['itemRecords'],
    });

    if (!cart) {
      throw new NotFoundException('Cart does not exist');
    }

    const itemsDataForMessage = cart.itemRecords.map((record) => ({
      count: record.count,
      color: record.item.color?.name,
      name: record.item.name,
      price: record.item.price,
    }));

    const totalSum = cart.itemRecords
      .map((item) => item.item.price * item.count)
      .reduce((prev, curr) => prev + curr, 0);

    this.telegramService.tgBot.sendMessage(
      process.env.TELEGRAM_CHAT_ID,
      this.telegramService.makeMessageAboutOrderInClick(dto, itemsDataForMessage, totalSum),
    );

    return;
  }
}
