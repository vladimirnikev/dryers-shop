import { CartService } from './../cart/cart.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt'
// import { sign } from 'jsonwebtoken';
// import { JWT_SECTRET } from '@app/config';
import { AuthUserDto } from './dto/authUser.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './entities/user.entity';
// import { UserResponceInterface } from './types/userResponce.interface';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private cartService: CartService
    ) { }

    async create(dto: CreateUserDto): Promise<UserEntity> {
        const userByEmail = await this.userRepository.findOne({ email: dto.email })
        const userByUsername = await this.userRepository.findOne({ username: dto.username })

        if (userByEmail || userByUsername) {
            throw new HttpException('Пользователь с таким email или логином уже зарегистрирован.',
                HttpStatus.UNPROCESSABLE_ENTITY)
        }

        const user = new UserEntity()
        Object.assign(user, dto)
        const cart = await this.cartService.createCartForUser()
        user.cart = cart
        const createdUser = await this.userRepository.save(user)

        delete createdUser.password
        return createdUser
    }

    async login(dto: AuthUserDto): Promise<UserEntity> {
        const user = await this.userRepository.findOne({ email: dto.email },
            { select: ['id', 'email', 'name', 'password', 'phone', 'surname', 'username', 'city'] })
        if (!user) {
            throw new HttpException('Неверный email или пароль.', HttpStatus.BAD_REQUEST)
        }

        const passMatch = await compare(dto.password, user.password)
        if (!passMatch) {
            throw new HttpException('Неверный email или пароль', HttpStatus.BAD_REQUEST)
        }

        delete user.password
        return user
    }

    async getById(id: number): Promise<UserEntity> {
        return await this.userRepository.findOne({ id })
    }

    async updateUser(dto: CreateUserDto, id: number): Promise<UserEntity> {
        const user = await this.getById(id)
        Object.assign(user, dto)
        return await this.userRepository.save(user)
    }

    async getUserRole(id: number): Promise<{ role: string }> {
        const user = await this.getById(id)
        if (!user) {
            throw new HttpException('User does not exist', HttpStatus.NOT_FOUND)
        }
        return { role: user.role }
    }

    // generateJwt(user: UserEntity): string {
    //     return sign({
    //         id: user.id,
    //         username: user.username,
    //         email: user.email
    //     }, JWT_SECTRET)
    // }

    // buildUserResponse(user: UserEntity): UserResponceInterface {
    //     return {
    //         user: {
    //             ...user,
    //             token: this.generateJwt(user)
    //         }
    //     }
    // }

}
