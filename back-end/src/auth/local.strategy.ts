import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpCode, HttpException, HttpStatus, Injectable, Param, UnauthorizedException, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as speakeasy from "speakeasy";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ passReqToCallback: true });
  }

  async validate(req: Request, username: string, password: string): Promise<any> {

    let code: string = req.body['code'];

    const user = await this.authService.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    if (user.twofa === true) {

      const verified = speakeasy.totp.verify(
        {
          secret: user.secret,
          encoding: 'ascii', 
          token: code
        }
      )

      if (!verified)
        throw new HttpException('incorrect totp code', HttpStatus.I_AM_A_TEAPOT);

    }

    return user;
  }
}