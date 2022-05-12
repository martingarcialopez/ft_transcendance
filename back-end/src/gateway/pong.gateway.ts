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

import { Pong } from '../models/pong.entity'
import { PongDto } from '../dtos/in/pong.dto';
import { PongService } from '../services/pong.service';

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

	@SubscribeMessage('joinPongRoom')
	async join(socket: Socket, pongDto: PongDto): Promise<void> {
        let value = await this.pongService.moveAction(pongDto);
        this.server.emit('EVENT_TO_FRONT', value);
    }

	@SubscribeMessage('move')
	async moveAction(socket: Socket, pongDto: PongDto): Promise<void> {
		let value = await this.pongService.moveAction(pongDto);
		this.server.emit('EVENT_TO_FRONT', value);
	}
}
