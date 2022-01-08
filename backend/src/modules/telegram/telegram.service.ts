import { Injectable } from '@nestjs/common';
import { CartEntity } from '@app/components/cart/entities/cart.entity';
import * as dayjs from 'dayjs';
import * as TelegramBot from 'node-telegram-bot-api'
import { TG_BOT_TOKEN } from '@app/config';
import { ItemRecordEntity } from '@app/components/cart/entities/itemRecord.entity';
import { DeliveryMethod, PaymentMethod } from '@app/common/enums/cart.enum';

@Injectable()
export class TelegramService {
    tgBot = new TelegramBot(TG_BOT_TOKEN, { polling: true })

    makeMessageAboutOrder(order: CartEntity): string {
        const generateDeliveryMethod = (method: string) => {
            switch (method) {
                case DeliveryMethod.POST:
                    return 'Новая почта'
                case DeliveryMethod.SHOP:
                    return 'заберет в магазине'
            }
        }

        const generatePaymentMethod = (method: string) => {
            switch (method) {
                case PaymentMethod.CASH:
                    return 'наложенный платеж'
                case PaymentMethod.CARD:
                    return 'перевод на карту'
                case PaymentMethod.IN_SHOP:
                    return 'в магазине'
            }
        }

        const generateProductList = (products: ItemRecordEntity[]) => {
            return products.map((item, index) =>
                `${index + 1}-й товар:
    Название: ${item.item.name}
    Цвет: ${item.color}
    Кол-во: ${item.count}`).join('\n')
        }

        return `Поступил новый заказ.
1. Имя: ${order.name}
2. Фамилия: ${order.surname}
3. Номер телефона: ${order.phone}
4. Город: ${order.city}
5. Способ доставки: ${generateDeliveryMethod(order.deliveryMethod)}
6. Место доставки: ${order.deliveryTo}
7. Метод оплаты: ${generatePaymentMethod(order.paymentMethod)}
${order.comments ? '8. Комментарии к заказу: ' + order.comments : ''}
Список товаров: 
${generateProductList(order.itemRecords)}.
Cумма к оплате: ${order.totalSum}UAH`
    }

    checkCurrentTimeForMessage(phone: string, time: string, name?: string): string {
        const currentHour = dayjs().get('hour')
        const startHour = 8
        const endHour = 17
        if (currentHour < endHour && currentHour > startHour) {
            return `Поступила новая просьба перезвонить.${name ? ' Имя - ' + name + '.' : ''} Номер телефона - ${phone}.`
        }
        return `Поступила новая просьба перезвонить.${name ? ' Имя - ' + name + '.' : ''} Номер телефона - ${phone}. Желаемое время звонка - завтра в ${time}`
    }
}
