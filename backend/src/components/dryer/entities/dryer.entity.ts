import { ColorEntity } from '../../color/entities/color.entity';
import { ManufacturerEntity } from './../../manufacturer/entities/manufacturer.entity';
import { ItemRecordEntity } from './../../cart/entities/itemRecord.entity';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'dryers' })
export class DryerEntity {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn({
        type: 'timestamp without time zone',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        select: false,
    })
    createdAt: Date

    @Column()
    name: string

    @Column()
    price: number

    @Column()
    availability: boolean

    @Column({ type: 'simple-array', nullable: true })
    imageUrls: string[]

    @Column()
    description: string

    @Column()
    power: number

    @OneToMany(() => ItemRecordEntity, record => record.item)
    itemRecords: ItemRecordEntity[]

    @ManyToOne(() => ManufacturerEntity, (manufacturer) => manufacturer.products, {
        onDelete: 'CASCADE'
    })
    manufacturer: ManufacturerEntity

    @ManyToMany(() => ColorEntity, (color) => color.products, {
        eager: true,
        nullable: true,
        onDelete: 'CASCADE',
    })
    @JoinTable()
    colors: ColorEntity[]
}