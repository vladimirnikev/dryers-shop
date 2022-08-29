import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IStock } from 'src/app/common/interfaces/stock.interface';
import { HttpService } from './http.service';

@Injectable()
export class StocksService {
  constructor(private httpService: HttpService) {}

  getStocks(): Observable<IStock[]> {
    return this.httpService.get('stocks');
  }

  getOneStock(id: number): Observable<IStock> {
    return this.httpService.get(`stocks/${id}`);
  }

  createStock(dto): Observable<IStock> {
    return this.httpService.post('stocks', dto);
  }

  updateStock(dto, id: number): Observable<IStock> {
    return this.httpService.put(`stocks/${id}`, dto);
  }

  deleteStock(id: number): Observable<IStock> {
    return this.httpService.delete(`stocks/${id}`);
  }
}
