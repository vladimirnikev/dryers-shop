import { ItemRecordEntity } from './itemRecord.entity';
import { AfterLoad, AfterUpdate, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { UserEntity } from '@app/components/user/entities/user.entity';
import { DryerEntity } from '@app/components/dryer/entities/dryer.entity';
import { OrderEntity } from '@app/components/order/entities/order.entity';

@Entity({ name: 'carts', })
export class CartEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ default: 0 })
    totalSum: number

    @Column()
    sessionId: string

    @CreateDateColumn({ type: 'timestamp without time zone' })
    createdAt: Date

    @OneToMany(() => ItemRecordEntity, (itemRecord) => itemRecord.cart)
    itemRecords: ItemRecordEntity[]

    @OneToOne(() => UserEntity, user => user.cart)
    user: UserEntity

    @OneToOne(() => OrderEntity)
    order: OrderEntity
}
// Создать табличку записей айтемов / удалить табличку корзины / запрашивать все записи по сессии / очищать все записи по истечению первой записи