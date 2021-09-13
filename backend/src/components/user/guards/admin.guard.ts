import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { ExpressRequestInterface } from '@app/common/types/expressRequest.interface';


@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<ExpressRequestInterface>()

    if (req.user.role === 'ADMIN') {
      return true
    }

    throw new HttpException('У вас недостаточно прав', HttpStatus.UNAUTHORIZED)
  }
}
