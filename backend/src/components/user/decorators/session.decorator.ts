import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { ExpressRequestInterface } from '@app/common/types/expressRequest.interface';


export const SessionId = createParamDecorator((data, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<ExpressRequestInterface>()
    const res = ctx.switchToHttp().getResponse()

    if (!req.cookies['sessionId']) {
        const sessionId = uuid()
        res.cookie('sessionId', sessionId, { maxAge: 30 * 24 * 60 * 60 * 1000 })
        return sessionId
    }

    // if (!req.session.isVisit) {
    //     req.session.isVisit = true
    // }
    return req.cookies['sessionId']
})
