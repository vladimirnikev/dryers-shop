import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isExistNotEmptyValue',
})
export class IsExistNotEmptyValuePipe implements PipeTransform {
  transform(value: any, arg: string): unknown {
    return value.some((obj) => !!obj[arg]);
  }
}
