import { Request } from "express";

import { UserEntity } from "@app/components/user/entities/user.entity";
// import { Session } from "inspector";
import { Session, SessionData } from "express-session";


export interface ExpressRequestInterface extends Request {
    user?: UserEntity,
    session: Session & Partial<SessionData> & { isVisit?: boolean }
}