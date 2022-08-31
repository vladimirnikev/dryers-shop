import { Injectable } from '@nestjs/common';
import { CartEntity } from '@app/components/cart/entities/cart.entity';
import * as dayjs from 'dayjs';
import * as TelegramBot from 'node-telegram-bot-api';
import { ItemRecordEntity } from '@app/components/cart/entities/itemRecord.entity';
import { DeliveryMethod, PaymentMethod } from '@app/common/enums/cart.enum';

@Injectable()
export class TelegramService {
  tgBot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

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

    const generateProductList = (products: ItemRecordEntity[]) => {
      return products
        .map(
          (item, index) =>
            `${index + 1}-й товар:
    Название: ${item.item.name}
    Цвет: ${item.item.color}
    Кол-во: ${item.count}`,
        )
        .join('\n');
    };

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
${generateProductList(order.itemRecords)}.
Cумма к оплате: ${order.totalSum} UAH`;
  }

  checkCurrentTimeForMessage(phone: string, time: string, name?: string): string {
    const currentHour = dayjs().get('hour');
    const startHour = 8;
    const endHour = 17;
    if (currentHour < endHour && currentHour > startHour) {
      return `Поступила новая просьба перезвонить.${
        name ? ' Имя - ' + name + '.' : ''
      } Номер телефона - ${phone}.`;
    }
    return `Поступила новая просьба перезвонить.${
      name ? ' Имя - ' + name + '.' : ''
    } Номер телефона - ${phone}. Желаемое время звонка - завтра в ${time}`;
  }
}
