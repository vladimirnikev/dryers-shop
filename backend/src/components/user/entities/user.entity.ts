import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { hash } from 'bcrypt';
import { ReviewEntity } from '../../review/entities/review.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ default: '' })
  username: string;

  @Column({ default: '' })
  name: string;

  @Column({ default: '' })
  surname: string;

  @Column({ default: '' })
  city: string;

  @Column({ default: '' })
  phone: string;

  @Column({ default: 'USER' })
  role: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  @OneToMany(() => ReviewEntity, (review) => review.user)
  reviews: ReviewEntity[];
}
