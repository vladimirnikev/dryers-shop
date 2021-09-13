import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'calls' })
export class CallEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    phone: string

    @Column()
    time: string

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date
}