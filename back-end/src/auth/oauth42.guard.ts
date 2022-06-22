
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class Oauth42Guard extends AuthGuard('Oauth42') {}