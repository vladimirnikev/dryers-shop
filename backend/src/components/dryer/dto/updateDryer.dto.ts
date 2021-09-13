import { IsNotEmpty } from "class-validator"

export class UpdateDryerDto {
    @IsNotEmpty()
    readonly name: string
    @IsNotEmpty()
    readonly price: number
    @IsNotEmpty()
    readonly availability: boolean
    @IsNotEmpty()
    readonly img: string
    @IsNotEmpty()
    readonly color: string[]
    @IsNotEmpty()
    readonly description: string
    @IsNotEmpty()
    readonly batch: string
    @IsNotEmpty()
    readonly power: number
}