import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {Pong} from '../models/pong.entity';
import { PongDto } from '../dtos/in/pong.dto';

@Injectable()
export class PongService {
	/*if needed*/
//	@Inject(UserService)
  //  private readonly userService: UserService;
	constructor(
        @InjectRepository(Pong) private readonly pongRepository: Repository<Pong>,
    ){}

	async moveAction(pongDto: PongDto): Promise<void> {
		//DO SOME STUSS
	}
}
