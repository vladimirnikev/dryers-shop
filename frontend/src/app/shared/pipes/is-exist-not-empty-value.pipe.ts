import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isExistNotEmptyValue',
})
export class IsExistNotEmptyValuePipe implements PipeTransform {
  transform(value: any, key: string, innerKey?: string): unknown {
    return innerKey ? value?.some((obj) => !!obj[key][innerKey]) : value?.some((obj) => !!obj[key]);
  }
}
