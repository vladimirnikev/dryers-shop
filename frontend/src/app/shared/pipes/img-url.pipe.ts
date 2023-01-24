import { environment } from 'src/environments/environment';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgUrl',
})
export class ImgUrlPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: string, ...args: unknown[]): string {
    return value.includes('https://') ? value : environment.serverImagesUrl + value;
  }
}
