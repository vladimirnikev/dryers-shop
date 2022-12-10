import { DryerEntity } from '@app/components/dryer/entities/dryer.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'manufacturers' })
export class ManufacturerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  name: string;

  @Column({ default: '' })
  img: string;

  @OneToMany(() => DryerEntity, (product) => product.manufacturer, {
    nullable: true,
  })
  products: DryerEntity[];
}
