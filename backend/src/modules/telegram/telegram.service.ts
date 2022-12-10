import { Injectable } from '@nestjs/common';
import { CartEntity } from '@app/components/cart/entities/cart.entity';
import * as TelegramBot from 'node-telegram-bot-api';
import { ItemRecordEntity } from '@app/components/cart/entities/itemRecord.entity';
import { DeliveryMethod, PaymentMethod } from '@app/common/enums/cart.enum';
import { MakeOrderInClickDto } from '@app/components/cart/dto/makeOrderInClick.dto';
import {
  IProductDataForMessage,
  IProductDataForMessageWithCount,
} from '@app/common/interfaces/product-data-for-message.interface';

@Injectable()
export class TelegramService {
  tgBot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

  generateProductList(products: ItemRecordEntity[] | IProductDataForMessageWithCount[]) {
    return products
      .map(
        (item, index) =>
          `${index + 1}-й товар:
  Название: ${item.item?.name || item.name}
  Цвет: ${item.item?.color?.name || item.color?.name}
  Цена: ${item.item?.price || item.price} UAH
  Кол-во: ${item.count}`,
      )
      .join('\n');
  }

  makeMessageAboutOrder(order: CartEntity): string {
    const generateDeliveryMethod = (method: string) => {
      switch (method) {
        case DeliveryMethod.POST:
          return 'Новая почта';
        case DeliveryMethod.SHOP:
          return 'Заберет в магазине';
      }
    };

    const generatePaymentMethod = (method: string) => {
      switch (method) {
        case PaymentMethod.CASH:
          return 'Наложенный платеж';
        case PaymentMethod.CARD:
          return 'Перевод на карту';
        case PaymentMethod.CARD_ONLINE:
          return 'Картой онлайн';
      }
    };

    const totalSum = order.itemRecords
      .map((item) => item.item.price * item.count)
      .reduce((prev, curr) => prev + curr, 0);

    return `Поступил новый заказ.
- ФИО: ${order.fullName}
- Номер телефона: ${order.phone}
- Способ доставки: ${generateDeliveryMethod(order.deliveryType)}
${
  order.deliveryType === 'POST'
    ? `- Город: ${order.city}
- Тип доставки: ${
        order.postType === 'OFFICE'
          ? `В отделение ${order.office}`
          : `Курьер
- Улица: ${order.street}
- Номер дома: ${order.houseNumber}
${!!order.entrance ? `- Подъезд: ${order.entrance}` : `- Подъезд не указан`}
${!!order.floor ? `- Этаж": ${order.floor}` : '- Этаж не указан'}
${
  !!order.apartmentNumber
    ? `- Номер квартиры: ${order.apartmentNumber}`
    : '- Номер квартиры не указан'
}`
      }`
    : ''
}
- Метод оплаты: ${generatePaymentMethod(order.paymentType)}

Список товаров: 
${this.generateProductList(order.itemRecords)}.
Cумма к оплате: ${totalSum} UAH`;
  }

  checkCurrentTimeForMessage(phone: string, name: string, message: string): string {
    return `Поступила новая просьба перезвонить.
${name ? 'Имя: ' + name + '.' : ''} 
Номер телефона: ${phone}.
${
  message
    ? `Сообщение:
${message}`
    : ''
}`;
  }

  makeMessageAboutOrderInClick(
    dto: MakeOrderInClickDto,
    data: IProductDataForMessage | IProductDataForMessageWithCount[],
    totalSum?: number,
  ) {
    const firstPartOfMessage = `Новый заказ в один клик.
- ФИО: ${dto.fullName}
- Номер телефона: ${dto.phone}
${dto.message ? `- Комментарий: ${dto.message}` : ''}`;

    if (!totalSum) {
      const secondPartOfMessage = `Товар: 
- Название: ${(data as IProductDataForMessage).name}
- Цена: ${(data as IProductDataForMessage).price} UAH`;

      return firstPartOfMessage + '\n' + secondPartOfMessage;
    }

    const secondPartOfMessage = this.generateProductList(data as IProductDataForMessageWithCount[]);
    return (
      firstPartOfMessage +
      '\n' +
      'Список товаров:' +
      '\n' +
      secondPartOfMessage +
      '\n' +
      `Cумма: ${totalSum} UAH`
    );
  }
}
