import { IsDate, IsDateString, IsNotEmpty, IsPhoneNumber } from "class-validator";

export class CreateCallDto {
    @IsNotEmpty()
    @IsPhoneNumber('UA')
    readonly phone: string

    // @IsNotEmpty()
    readonly time: string
}