import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ExpressRequestInterface } from '@app/common/types/expressRequest.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<ExpressRequestInterface>();
    if (req.user) {
      return true;
    }

    throw new HttpException('Пользователь не авторизован', HttpStatus.UNAUTHORIZED);
  }
}
