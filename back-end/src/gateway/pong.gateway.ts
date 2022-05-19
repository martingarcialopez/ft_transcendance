import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
} from '@nestjs/websockets';
import { NestGateway } from '@nestjs/websockets/interfaces/nest-gateway.interface';
import { Bind, UseInterceptors } from '@nestjs/common';
import { Logger, Body } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

import { Matchmaking } from '../models/matchmaking.entity'
import { PongDto } from '../dtos/in/pong.dto';
import { PongService } from '../services/pong.service';
import { moveDto } from 'src/dtos/in/move.dto';
import { GameEntity } from 'src/models/game.entity';

/*this declarator gives us access to the socket.io functionality*/
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})

export class PongGateway
{
  @WebSocketServer() server: Server;

  constructor(
    private readonly pongService: PongService,
  ) {}


	@SubscribeMessage('lookingForplay')
	async lookingForplayn(socket: Socket, userId: number) : Promise<void> {
		console.log('lookingForplay Gateway');
		let value = await this.pongService.managePlayer(socket, this.server, userId);

	}


	@SubscribeMessage('joinPongRoom')
	async join(socket: Socket, pongDto: PongDto): Promise<void> {
		console.log('joinPongRoom Gateway');
        // let value = await this.pongService.moveAction(pongDto);
        // this.server.emit('EVENT_TO_FRONT', value);
    }

	@SubscribeMessage('move')
	async moveAction(socket: Socket, move: GameEntity): Promise<void> {
		// let value = await this.pongService.moveAction(pongDto);
		// this.server.emit('EVENT_TO_FRONT', value);
    //console.log('in move event with move');
    //console.log(move);

    await this.pongService.registerMove(move);

	}

  // @SubscribeMessage('startGame')
  // startPongGame(client: Socket) {

  //   this.pongService.playGame(client);
  // }
}
