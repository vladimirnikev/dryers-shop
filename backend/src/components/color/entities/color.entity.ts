import { ItemRecordEntity } from '@app/components/cart/entities/itemRecord.entity';
import { DryerEntity } from '@app/components/dryer/entities/dryer.entity';
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'colors' })
export class ColorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  name: string;

  @Column({ default: '' })
  nameUa: string;

  @Column({ default: '#000000' })
  code: string;

  @OneToMany(() => ItemRecordEntity, (itemRecord) => itemRecord.color)
  itemRecords: ItemRecordEntity[];

  @ManyToMany(() => DryerEntity, (product) => product.colors, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  products: DryerEntity[];
}
