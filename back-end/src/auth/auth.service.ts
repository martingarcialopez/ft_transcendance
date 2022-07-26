import { Injectable, Inject, ImATeapotException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/services/user.service';
import { User } from "../models/user.entity";
import * as speakeasy from "speakeasy";
import * as qrcode from "qrcode";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
        ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.getUser(username);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validate42User(login42: string): Promise<any> {

    const user = await this.usersService.getUserBy42Login(login42);

    if (user && user.login42 === login42) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user) {
  const db_user: User = await this.usersService.getUser(user.username);
  this.usersService.updateUser( { "status": "online" }, db_user.id.toString() );
  const payload = { username: db_user.username, sub: db_user.id/*, sub: user.userId*/ };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async logout(user) {

  const db_user: User = await this.usersService.getUser(user.username);
  if (db_user)
    this.usersService.updateUser( { "status": "offline" }, db_user.id.toString() );
  }

async updateSecret(code: string, id: string) {

  this.usersService.updateUser( { "secret": code }, id);
}

async enable2FA(id: string) : Promise<string> {

  const user = await this.usersService.getUserById(id);

  if (!user)
    throw new NotFoundException();

  const secret = speakeasy.generateSecret({ name: "Amazing Pong" });

  await this.usersService.updateUser( { twofa: true, secret: secret.ascii}, id);

  let qrPromise = new Promise<string>( (resolve, reject) => {
    qrcode.toDataURL(secret.otpauth_url, function(err, data) {
      if (err) {
        reject()
        throw new ImATeapotException();
      }
       resolve(data)
   })
  })

  return qrPromise;
}

async disable2FA(id: string) {

  const user = await this.usersService.getUserById(id);
  
  if (!user)
    throw new NotFoundException();

  this.usersService.updateUser( { twofa: false, secret: null }, id);

}

}