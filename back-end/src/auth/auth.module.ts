import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/modules/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { Oauth42Strategy } from './oauth42.strategy';
import { HttpModule } from '@nestjs/axios';
import { User } from 'src/models/user.entity';

@Module({
  imports: [
    HttpModule,
    UserModule, 
    PassportModule,
    JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '86400s' }, // expires in a day (86400 seconds)
      }),
    ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, Oauth42Strategy],
})
export class AuthModule {}