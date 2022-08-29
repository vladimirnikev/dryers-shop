import { DryerEntity } from '@app/components/dryer/entities/dryer.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'manufacturers' })
export class ManufacturerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => DryerEntity, (product) => product.manufacturer, {
    nullable: true,
  })
  products: DryerEntity[];
}
