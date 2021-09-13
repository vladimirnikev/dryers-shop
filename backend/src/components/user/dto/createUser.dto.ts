import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    readonly email: string
    @MinLength(8)
    @IsNotEmpty()
    readonly password: string
    @IsNotEmpty()
    readonly username: string
    readonly name: string
    readonly surname: string
    readonly city: string
    readonly phone: string
}