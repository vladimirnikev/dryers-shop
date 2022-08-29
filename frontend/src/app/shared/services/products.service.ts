import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/common/interfaces/product.interface';
import { ISliderPriceFilter } from 'src/app/common/interfaces/slider-price-filter.interface';
import { HttpService } from './http.service';
import { HelperService } from './helper.service';

@Injectable()
export class ProductsService {
  constructor(private httpService: HttpService, private helperService: HelperService) {}

  getOneProduct(id: number): Observable<IProduct> {
    return this.httpService.get(`products/${id}`);
  }

  getManyProducts(params): Observable<{ data: IProduct[]; totalCount: number }> {
    params = this.helperService.createFilterParamsFromForm(params);
    return this.httpService.get(`products`, { params });
  }

  createProduct(formData: FormData): Observable<IProduct> {
    return this.httpService.post('products', formData);
  }

  updateProduct(formData: any, id: number): Observable<IProduct> {
    return this.httpService.put(`products/${id}`, formData);
  }

  deleteProduct(id: number) {
    return this.httpService.delete(`products/${id}`);
  }

  deleteImage(id: number, data: { imageUrl: string }) {
    return this.httpService.put(`products/${id}/image`, data);
  }

  getPriceRange(params): Observable<ISliderPriceFilter> {
    return this.httpService.get(`products/price-range`, { params });
  }

  getViewedProducts(): Observable<IProduct[]> {
    return this.httpService.get('products/viewed');
  }

  getSimilarProductsByName(name: string): Observable<{ totalCount; data: IProduct[] }> {
    return this.httpService.get('products', { params: { name, limit: 10 } });
  }
}
