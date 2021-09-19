import { IsNumber } from "class-validator";

export class IncrementItemRecordQuantityDto {
    @IsNumber()
    readonly itemRecordId: number
}