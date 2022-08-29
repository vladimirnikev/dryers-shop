import { ColorEntity } from '../../color/entities/color.entity';
import { ManufacturerEntity } from './../../manufacturer/entities/manufacturer.entity';
import { ItemRecordEntity } from './../../cart/entities/itemRecord.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StockEntity } from '@app/components/stock/entities/stock.entity';
import { EProductType } from '@app/common/enums/product-type.enum';

@Entity({ name: 'dryers' })
export class DryerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamp without time zone',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    select: false,
  })
  createdAt: Date;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  oldPrice: number;

  @Column({
    type: 'enum',
    enum: EProductType,
    default: EProductType.WATER,
  })
  category: EProductType;

  @Column()
  availability: boolean;

  @Column({ type: 'simple-array', nullable: true })
  imageUrls: string[];

  @Column()
  description: string;

  @Column()
  power: number;

  @OneToMany(() => ItemRecordEntity, (record) => record.item)
  itemRecords: ItemRecordEntity[];

  @ManyToOne(() => ColorEntity, (color) => color.products, {
    eager: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  color: ColorEntity;

  @ManyToOne(() => ManufacturerEntity, (manufacturer) => manufacturer.products, {
    onDelete: 'CASCADE',
  })
  manufacturer: ManufacturerEntity;

  @ManyToMany(() => ColorEntity, (color) => color.products, {
    eager: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  colors: ColorEntity[];

  @ManyToMany(() => StockEntity, (stock) => stock.products, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  stocks: StockEntity[];
}
