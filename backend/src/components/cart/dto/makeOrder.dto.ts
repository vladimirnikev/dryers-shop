import { IsEmail, IsEnum, IsOptional, IsPhoneNumber, IsString, ValidateIf } from "class-validator";
import { DeliveryMethod, PaymentMethod } from "../entities/cart.entity";

export class MakeOrderDto {
    @IsString()
    readonly name: string
    @IsString()
    readonly surname: string
    @IsPhoneNumber('UA')
    readonly phone: string
    @IsEmail()
    readonly email: string
    @IsString()
    readonly city: string
    @IsEnum(DeliveryMethod)
    readonly deliveryMethod: DeliveryMethod
    @ValidateIf(o => o.deliveryMethod === DeliveryMethod.POST)
    @IsString()
    readonly deliveryTo: string
    @IsEnum(PaymentMethod)
    readonly paymentMethod: PaymentMethod
    @IsString()
    @IsOptional()
    readonly comments: string
}