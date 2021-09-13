import { ItemRecordEntity } from './../../cart/entities/itemRecord.entity';
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { CartEntity } from "@app/components/cart/entities/cart.entity";

@Entity({ name: 'dryers' })
export class DryerEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    price: number

    @Column()
    availability: boolean

    @Column({ default: '' })
    img: string

    @Column({ type: 'simple-array' })
    color: string[]

    @Column()
    description: string

    @Column()
    batch: string

    @Column()
    power: number

    // @ManyToOne(() => CartEntity, (cart) => cart.dryers)
    // cart: CartEntity

    @OneToMany(() => ItemRecordEntity, record => record.item)
    itemRecords: ItemRecordEntity[]
}