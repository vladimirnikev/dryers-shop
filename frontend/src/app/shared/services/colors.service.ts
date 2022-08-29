import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { IColor } from 'src/app/common/interfaces/color.interface';
import { HttpService } from './http.service';

@Injectable()
export class ColorsService {
  constructor(private httpService: HttpService) {}

  getColors(): Observable<IColor[]> {
    return this.httpService.get('colors');
  }

  createColor(dto: { name: string }): Observable<IColor> {
    return this.httpService.post('colors', dto);
  }

  updateColor(dto: { name: string }, id: number): Observable<IColor> {
    return this.httpService.put(`colors/${id}`, dto);
  }

  deleteColor(id) {
    return this.httpService.delete(`colors/${id}`);
  }
}
