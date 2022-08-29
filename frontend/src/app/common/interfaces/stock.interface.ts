export interface IStock {
  id: number;
  name: string;
  img: string;
  isActive: boolean;
  products?: number[];
}
