import { ItemRecordEntity } from './../../cart/entities/itemRecord.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DeliveryMethod, PaymentMethod } from '@app/common/enums/cart.enum';

@Entity({ name: 'orders' })
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  city: string;

  @Column({
    type: 'enum',
    enum: DeliveryMethod,
    default: DeliveryMethod.SHOP,
  })
  deliveryMethod: string;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
    default: PaymentMethod.CASH,
  })
  paymentMethod: string;

  @Column()
  comments: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => ItemRecordEntity, (itemRecord) => itemRecord.order)
  itemRecords: ItemRecordEntity[];
}
