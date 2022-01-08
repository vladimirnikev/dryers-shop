import { IsBoolean, IsNumber, IsString } from "class-validator"

export class CreateDryerDto {
    @IsString()
    readonly name: string
    @IsNumber()
    readonly price: number
    @IsBoolean()
    readonly availability: boolean
    @IsString()
    readonly colors: string
    @IsString()
    readonly description: string
    @IsString()
    readonly manufacturer: number
    @IsNumber()
    readonly power: number
}