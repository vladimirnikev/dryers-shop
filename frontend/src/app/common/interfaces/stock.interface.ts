export interface IStock {
  id: number;
  name: string;
  nameUa: string;
  img: string;
  imgUa: string;
  isActive: boolean;
  products?: number[];
}
