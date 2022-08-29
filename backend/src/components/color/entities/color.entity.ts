import { DryerEntity } from '@app/components/dryer/entities/dryer.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'colors' })
export class ColorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => DryerEntity, (product) => product.colors, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  products: DryerEntity[];
}
