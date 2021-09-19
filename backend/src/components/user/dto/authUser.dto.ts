import { IsEmail, IsNotEmpty, MinLength } from "class-validator"

export class AuthUserDto {
    @IsEmail()
    readonly email: string
    @MinLength(8)
    readonly password: string
}