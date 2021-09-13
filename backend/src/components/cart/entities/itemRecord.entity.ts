import { CartEntity } from '@app/components/cart/entities/cart.entity';
import { DryerEntity } from '@app/components/dryer/entities/dryer.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ItemRecordEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ default: 1 })
    count: number

    @Column()
    color: string

    // @Column()
    // sessionId: string

    @ManyToOne(() => CartEntity)
    cart: number

    @ManyToOne(() => DryerEntity, dryer => dryer.id)
    // @JoinColumn()
    item: DryerEntity
}