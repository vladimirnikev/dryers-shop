import { ItemRecordEntity } from './itemRecord.entity';
import { AfterLoad, AfterUpdate, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { UserEntity } from '@app/components/user/entities/user.entity';
import { DryerEntity } from '@app/components/dryer/entities/dryer.entity';
import { OrderEntity } from '@app/components/order/entities/order.entity';


export enum DeliveryMethod {
    SHOP = 'SHOP',
    POST = 'POST'
}

export enum PaymentMethod {
    CASH = 'CASH',
    CARD = 'CARD',
    IN_SHOP = 'IN_SHOP'
}
@Entity({ name: 'carts', })
export class CartEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ default: 0 })
    totalSum: number

    @Column({ nullable: true })
    sessionId: string

    @CreateDateColumn({ type: 'timestamp without time zone' })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp without time zone' })
    updatedAt: Date

    @OneToMany(() => ItemRecordEntity, (itemRecord) => itemRecord.cart)
    itemRecords: ItemRecordEntity[]

    // --------------------
    @Column({ default: '' })
    name: string

    @Column({ default: '' })
    surname: string

    @Column({ default: '' })
    phone: string

    @Column({ default: '' })
    email: string

    @Column({ default: '' })
    city: string

    @Column({ default: '' })
    deliveryTo: string

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

    @Column({ nullable: true })
    comments: string

    @Column({ default: false })
    isOrdered: boolean

    @OneToOne(() => UserEntity, user => user.cart)
    user: UserEntity

    // @OneToOne(() => OrderEntity)
    // order: OrderEntity


}
// Создать табличку записей айтемов / удалить табличку корзины / запрашивать все записи по сессии / очищать все записи по истечению первой записи