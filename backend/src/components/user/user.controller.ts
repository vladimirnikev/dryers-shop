import { Body, Controller, Get, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';

import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { UserResponceInterface } from './types/userResponce.interface';
import { AuthGuard } from './guards/auth.guard';
import { User } from './decorators/user.decorator';
import { UpdateUserDto } from './dto/updateUser.dto';
import { AuthUserDto } from './dto/authUser.dto';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @Post()
    @UsePipes(new ValidationPipe())
    async create(@Body() dto: CreateUserDto): Promise<UserResponceInterface> {
        const user = await this.userService.create(dto)
        return this.userService.buildUserResponse(user)
    }

    @Post('login')
    @UsePipes(new ValidationPipe())
    async login(@Body() dto: AuthUserDto): Promise<UserResponceInterface> {
        const user = await this.userService.login(dto)
        return this.userService.buildUserResponse(user)
    }

    @Put()
    @UseGuards(AuthGuard)
    async updateUser(@Body() dto: UpdateUserDto, @User('id') id: number): Promise<UserEntity> {
        return await this.userService.updateUser(dto, id)
    }

    @Get()
    @UseGuards(AuthGuard)
    async getUser(@User() user) {
        // console.log(user)
        return await this.userService.getById(20)
    }
}
