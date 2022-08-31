import { EPaymentType } from '../enums/payment-type.enum';
import { EDeliveryType, EPostType } from '../enums/delivery-type.enum';

export interface IOrderFormData {
  fullName: string;
  phone: string;
  email: string;
  paymentType: EPaymentType;
  delivery: IDeliveryType;
}

interface IDeliveryType {
  address: IAddressData;
  deliveryType: EDeliveryType;
  postType: EPostType;
}

interface IAddressData {
  city: string;
  office: string;
  courier: ICourierData;
}

interface ICourierData {
  street: string;
  houseNumber: string;
  floor: string;
  entrance: string;
  apartmentNumber: string;
}
