import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateDryerDto {
    @IsString()
    readonly name: string
    @IsNumber()
    readonly price: number
    @IsBoolean()
    readonly availability: boolean
    @IsString()
    readonly img: string
    @IsArray()
    readonly color: string[]
    @IsString()
    readonly description: string
    @IsString()
    readonly batch: string
    @IsNumber()
    readonly power: number
}