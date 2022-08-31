import { DeliveryMethod, PaymentMethod, PostMethod } from '@app/common/enums/cart.enum';
import {
  IsEmail,
  IsEnum,
  IsObject,
  IsOptional,
  IsPhoneNumber,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class CourierAddressDto {
  @IsString()
  readonly street: string;

  @IsString()
  readonly houseNumber: string;

  @IsString()
  @IsOptional()
  readonly floor: string;

  @IsString()
  @IsOptional()
  readonly entrance: string;

  @IsString()
  @IsOptional()
  readonly apartmentNumber: string;
}
class AddressDto {
  @IsString()
  readonly city: string;

  @IsString()
  @IsOptional()
  readonly office: string;

  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => CourierAddressDto)
  readonly courier: CourierAddressDto;
}

class DeliveryTypeDto {
  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => AddressDto)
  readonly address: AddressDto;

  @IsEnum(DeliveryMethod)
  readonly deliveryType: DeliveryMethod;

  @ValidateIf((o) => o.deliveryType === DeliveryMethod.POST)
  @IsString()
  readonly postType: PostMethod;
}

export class MakeOrderDto {
  @IsString()
  readonly fullName: string;

  @IsPhoneNumber('UA')
  readonly phone: string;

  @IsEmail()
  @IsOptional()
  readonly email: string;

  @IsEnum(PaymentMethod)
  readonly paymentType: PaymentMethod;

  @IsObject()
  @ValidateNested()
  @Type(() => DeliveryTypeDto)
  readonly delivery: DeliveryTypeDto;
}
