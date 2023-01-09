import { CartService } from './../cart/cart.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private cartService: CartService,
  ) {}

  async create(dto: CreateUserDto): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findOne({ where: { email: dto.email } });
    const userByUsername = await this.userRepository.findOne({
      where: { username: dto.username },
    });

    if (userByEmail || userByUsername) {
      throw new HttpException(
        'Пользователь с таким email или логином уже зарегистрирован.',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const user = new UserEntity();
    Object.assign(user, dto);
    await this.cartService.createCartForUser();
    const createdUser = await this.userRepository.save(user);

    delete createdUser.password;
    return createdUser;
  }

  async getById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async updateUser(dto: CreateUserDto, id: number): Promise<UserEntity> {
    const user = await this.getById(id);
    Object.assign(user, dto);
    return await this.userRepository.save(user);
  }

  async getUserRole(id: number): Promise<{ role: string }> {
    const user = await this.getById(id);
    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }
    return { role: user.role };
  }
}
