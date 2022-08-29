export interface IProductFilteringParams {
  limit: number;
  offset: number;
  sortBy?: string;
  sortDirection?: 'ASC' | 'DESC';
  price?: string;
  manufacturer?: string[];
  color?: string[];
  availability?: string[];
  type?: string;
  name?: string;
}
