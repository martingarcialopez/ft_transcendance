import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/services/user.service';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UserService,
        private jwtService: JwtService
        ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.getUser(username);
    if (user && user.password === pass) {
      const { password, ... result } = user;
      return result;
    }
    return null;
  }

  async validate42User(/*username: string, */login42: string): Promise<any> {
    const user = await this.usersService.getUserBy42Login(login42);
    if (user && user.login42 === login42) {
      const { password, ... result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

}