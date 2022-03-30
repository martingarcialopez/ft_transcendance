import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'yoyoyoyo que fue lo que paso!';
  }
}
