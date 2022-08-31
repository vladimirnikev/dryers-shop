import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { hash } from 'bcrypt';
import { ReviewEntity } from '../../review/entities/review.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
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

  // @OneToOne(() => CartEntity, (cart) => cart.user, {
  //   onDelete: 'CASCADE',
  // })
  // @JoinColumn()
  // cart: CartEntity;

  @OneToMany(() => ReviewEntity, (review) => review.user)
  reviews: ReviewEntity[];
}
