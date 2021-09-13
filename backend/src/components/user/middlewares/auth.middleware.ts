import { JWT_SECTRET } from '@app/config';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { ExpressRequestInterface } from '@app/common/types/expressRequest.interface';
import { UserService } from '../user.service';


@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private userService: UserService) { }

  use(req: ExpressRequestInterface, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null
      next()
      return
    }

    const token = req.headers.authorization.split(' ')[1]

    verify(token, JWT_SECTRET, async (err, decoded) => {
      if (err) {
        req.user = null
        next()
      } else {
        req.user = await this.userService.getById(decoded.id)
        next()
      }
    })
  }
}
