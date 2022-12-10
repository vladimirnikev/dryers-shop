import { compare } from 'bcrypt';
import { AuthUserDto } from '@app/components/user/dto/authUser.dto';
import { UserEntity } from '@app/components/user/entities/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserResponceInterface } from '@app/components/user/types/userResponce.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(dto: AuthUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne(
      {
        where: { email: dto.email },
        select: ['id', 'email', 'name', 'password', 'phone', 'surname', 'username', 'city'],
      },
    );
    if (!user) {
      throw new HttpException('Неверный email или пароль.', HttpStatus.BAD_REQUEST);
    }

    const passMatch = await compare(dto.password, user.password);
    if (user && passMatch) {
      delete user.password;
      return user;
    }
    throw new HttpException('Неверный email или пароль', HttpStatus.BAD_REQUEST);
  }

  async login(user: UserEntity): Promise<UserResponceInterface> {
    const payload = { email: user.email, username: user.email, id: user.id };
    return {
      user: {
        ...user,
        token: this.jwtService.sign(payload),
      },
    };
  }
}
