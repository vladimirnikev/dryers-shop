import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { UserResponceInterface } from './types/userResponce.interface';
import { AuthGuard } from './guards/auth.guard';
import { User } from './decorators/user.decorator';
import { LocalAuthGuard } from '@app/modules/auth/guards/local-auth.guard';
import { AuthService } from '@app/modules/auth/auth.service';

@Controller('users')
export class UserController {
    constructor(
        private userService: UserService,
        private authService: AuthService
    ) { }

    @Post()
    async create(@Body() dto: CreateUserDto): Promise<UserResponceInterface> {
        const user = await this.userService.create(dto)
        // return this.userService.buildUserResponse(user)
        return this.authService.login(user)
    }

    // @Post('login')
    // @UseGuards(JwtAuthGuard) // ???
    // async login(@Body() dto: AuthUserDto): Promise<UserResponceInterface> {
    //     const user = await this.userService.login(dto)
    //     return this.userService.buildUserResponse(user)
    // }
    // @UseGuards(LocalAuthGuard)
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@User() user: UserEntity) {
        return this.authService.login(user)
    }


    @Put()
    @UseGuards(AuthGuard)
    async updateUser(@Body() dto: CreateUserDto, @User('id') id: number): Promise<UserEntity> {
        return await this.userService.updateUser(dto, id)
    }

    @Get()
    @UseGuards(AuthGuard)
    async getUser(@User('id') currentUserId) {
        return await this.userService.getById(currentUserId)
    }

    @Get('role')
    async getRole(@User('id') currentUser): Promise<{ role: string }> {
        return await this.userService.getUserRole(currentUser)
    }
}
