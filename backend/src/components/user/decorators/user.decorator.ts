import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { ExpressRequestInterface } from '@app/common/types/expressRequest.interface';


export const User = createParamDecorator((data, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<ExpressRequestInterface>()
    if (!req.user) {
        return null
    }

    if (data) {
        return req.user[data]
    }
    return req.user
})
