import { ItemRecordEntity } from './../../cart/entities/itemRecord.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { CartEntity } from "@app/components/cart/entities/cart.entity";
import { DryerEntity } from "@app/components/dryer/entities/dryer.entity";
import { UserEntity } from "@app/components/user/entities/user.entity";

export enum DeliveryMethod {
    SHOP = 'Shop',
    POST = 'Post'
}

export enum PaymentMethod {
    CASH = 'Cash',
    CARD = 'Card',
    IN_SHOP = 'In shop'
}

@Entity({ name: 'orders' })
export class OrderEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    surname: string

    @Column()
    phone: string

    @Column()
    email: string

    @Column()
    city: string

    @Column({
        type: 'enum',
        enum: DeliveryMethod,
        default: DeliveryMethod.SHOP
    })
    deliveryMethod: string

    @Column({
        type: 'enum',
        enum: PaymentMethod,
        default: PaymentMethod.CASH
    })
    paymentMethod: string

    @Column()
    comments: string

    @CreateDateColumn()
    createdAt: Date

    @OneToMany(() => ItemRecordEntity, itemRecord => itemRecord.id)
    itemRecords: ItemRecordEntity[]
    // @ManyToOne(() => UserEntity, (user) => user.orders)
    // customer: UserEntity

    // @OneToOne(() => CartEntity, (cart) => cart.order)
    // @OneToOne(() => CartEntity)
    // @JoinColumn()
    // cart: CartEntity

}
// -----------------------------
// ItemRecords передаются в Order, у ItemRecords удалить корзину и удалить корзину из таблицы
// -----------------------------