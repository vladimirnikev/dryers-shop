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

  @Column()
  name: string;

  @Column()
  img: string;

  @Column()
  isActive: boolean;

  @ManyToMany(() => DryerEntity, (product) => product.stocks, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  products: DryerEntity[];
}
