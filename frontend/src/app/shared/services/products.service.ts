import { HttpService } from './http.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductsService {

  constructor(
    private httpService: HttpService
  ) { }
    getOneProduct(id) {
      return this.httpService.get(`products/${id}`)
    }

    getManyProducts() {
      return this.httpService.get(`products`)
    }

    createProduct(data) {
      return this.httpService.post('products', data)
    }

    updateProduct(data, id) {
      return this.httpService.put(`products/${id}`, data)
    }

    deleteProduct(id) {
      return this.httpService.delete(`products/${id}`)
    }
}
