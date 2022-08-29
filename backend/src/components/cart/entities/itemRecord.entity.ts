import { OrderEntity } from './../../order/entities/order.entity';
import { CartEntity } from '@app/components/cart/entities/cart.entity';
import { DryerEntity } from '@app/components/dryer/entities/dryer.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ItemRecordEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 1 })
  count: number;

  @ManyToOne(() => CartEntity)
  cart: number;

  @ManyToOne(() => DryerEntity, (dryer) => dryer.itemRecords, { eager: true })
  item: DryerEntity;

  @ManyToOne(() => OrderEntity, (order) => order.itemRecords)
  order: OrderEntity;
}
