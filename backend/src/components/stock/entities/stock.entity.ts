import { DryerEntity } from '@app/components/dryer/entities/dryer.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'stocks' })
export class StockEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamp without time zone',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    select: false,
  })
  createdAt: Date;

  @Column({ default: '' })
  name: string;

  @Column({ default: '' })
  nameUa: string;

  @Column({ default: '' })
  img: string;

  @Column({ default: '' })
  imgUa: string;

  @Column({ default: false })
  isActive: boolean;

  @ManyToMany(() => DryerEntity, (product) => product.stocks, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  products: DryerEntity[];
}
