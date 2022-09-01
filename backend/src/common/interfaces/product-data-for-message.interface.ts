export interface IProductDataForMessage {
  code: string;
  name: string;
  price: number;
  color: string;
}

export interface IProductDataForMessageWithCount extends IProductDataForMessage {
  count: number;
}
