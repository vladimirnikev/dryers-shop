import { IsNumber, IsString } from "class-validator"

export class AddItemToCartDto {
    @IsNumber()
    readonly item: number
    @IsString()
    readonly color: string
}