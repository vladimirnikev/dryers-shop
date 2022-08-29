import { EQueryDirection } from '@app/common/enums/query-direction.enum';

export interface IGetProductsQuery {
  readonly name: string;
  readonly price: string;
  readonly availability: string;
  readonly color: string;
  readonly manufacturer: string;
  readonly power: string;
  readonly limit: number;
  readonly offset: number;
  readonly sortBy: string;
  readonly sortDirection: EQueryDirection;
  readonly type: string;
}
