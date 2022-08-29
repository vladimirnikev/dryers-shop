import { ItemRecordEntity } from './itemRecord.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '@app/components/user/entities/user.entity';
import { DeliveryMethod, PaymentMethod } from '@app/common/enums/cart.enum';

@Entity({ name: 'carts' })
export class CartEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  totalSum: number;

  @Column({ nullable: true })
  sessionId: string;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp without time zone' })
  updatedAt: Date;

  @OneToMany(() => ItemRecordEntity, (itemRecord) => itemRecord.cart)
  itemRecords: ItemRecordEntity[];

  @Column({ default: '' })
  name: string;

  @Column({ default: '' })
  surname: string;

  @Column({ default: '' })
  phone: string;

  @Column({ default: '' })
  email: string;

  @Column({ default: '' })
  city: string;

  @Column({ default: '' })
  deliveryTo: string;

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

  @Column({ nullable: true })
  comments: string;

  @Column({ default: false })
  isOrdered: boolean;

  @OneToOne(() => UserEntity, (user) => user.cart, { onDelete: 'CASCADE' })
  user: UserEntity;
}
