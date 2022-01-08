import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@app/components/user/entities/user.entity';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECTRET } from '@app/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserModule } from '@app/components/user/user.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: JWT_SECTRET,
      signOptions: { expiresIn: '3d' }
    }),
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => UserModule)
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy
  ],
  exports: [AuthService]
})
export class AuthModule { }
