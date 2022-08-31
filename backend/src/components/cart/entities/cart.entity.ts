import { ItemRecordEntity } from './itemRecord.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DeliveryMethod, PaymentMethod, PostMethod } from '@app/common/enums/cart.enum';

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
  fullName: string;

  @Column({ default: '' })
  phone: string;

  @Column({ default: '' })
  email: string;

  @Column({ type: 'enum', default: PaymentMethod.CASH, enum: PaymentMethod })
  paymentType: PaymentMethod;

  @Column({ type: 'enum', default: DeliveryMethod.SHOP, enum: DeliveryMethod })
  deliveryType: DeliveryMethod;

  @Column({ type: 'enum', nullable: true, enum: PostMethod })
  postType: PostMethod;

  @Column({ default: '' })
  city: string;

  @Column({ default: '' })
  office: string;

  @Column({ default: '' })
  street: string;

  @Column({ default: '' })
  houseNumber: string;

  @Column({ default: '' })
  floor: string;

  @Column({ default: '' })
  entrance: string;

  @Column({ default: '' })
  apartmentNumber: string;

  @Column({ default: false })
  isOrdered: boolean;
}
