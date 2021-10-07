import { Body, Controller, Get, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';

import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { UserResponceInterface } from './types/userResponce.interface';
import { AuthGuard } from './guards/auth.guard';
import { User } from './decorators/user.decorator';
import { AuthUserDto } from './dto/authUser.dto';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @Post()
    async create(@Body() dto: CreateUserDto): Promise<UserResponceInterface> {
        const user = await this.userService.create(dto)
        return this.userService.buildUserResponse(user)
    }

    @Post('login')
    async login(@Body() dto: AuthUserDto): Promise<UserResponceInterface> {
        const user = await this.userService.login(dto)
        return this.userService.buildUserResponse(user)
    }

    @Put()
    @UseGuards(AuthGuard)
    async updateUser(@Body() dto: CreateUserDto, @User('id') id: number): Promise<UserEntity> {
        return await this.userService.updateUser(dto, id)
    }

    @Get()
    @UseGuards(AuthGuard)
    async getUser(@User('id') currentUserId) {
        // console.log(user)
        return await this.userService.getById(currentUserId)
    }

    @Get('role')
    async getRole(@User('id') currentUser): Promise<{role: string}>{
        return await this.userService.getUserRole(currentUser)
    }
}
