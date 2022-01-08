import { UserService } from "@app/components/user/user.service";
import { JWT_SECTRET } from "@app/config";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly userService: UserService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JWT_SECTRET
        })
    }

    async validate(payload) {
        const user = await this.userService.getById(payload.id)
        delete user.role
        return user
    }

}