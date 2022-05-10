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
import { Message } from '../models/message.entity';
import { Room } from '../models/room.entity';
import { Participant } from '../models/participant.entity';
import { NestGateway } from '@nestjs/websockets/interfaces/nest-gateway.interface';
import { Bind, UseInterceptors } from '@nestjs/common';
import { MessageService } from '../services/message.service';
import { ParticipantService } from '../services/participant.service';
import { Logger, Body } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { ParticipantDto } from '../dtos/in/participant.dto';

/*this declarator gives us access to the socket.io functionality*/
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})

export class ParticipantGateway
{
  @WebSocketServer() server: Server;

  constructor(
    private readonly participantService: ParticipantService,
  ) {}

  @SubscribeMessage('createParticipant')
	async createParticipant(participant: ParticipantDto) {
		console.log('Enter to createParticipant event');
		cosole.log('userId:', participant.userId, ' roomId: ', participant.roomId);
      const participantId = await this.participantService.createParticipant(participant);
		console.log('after call createParticipant service and send to front');
		this.server.emit('participantId', participantId);
		console.log('already send to FRONT');
  }

  @SubscribeMessage('getParticipant')
  async getParticipant(room_id: number) {
    const all_participant = await this.participantService.getParticipant(
      room_id,
    );
  }

  @SubscribeMessage('getUseridRooms')
  async getUseridRooms(userId: any) {
    const rooms = await this.participantService.getUseridRooms(userId);
  }


}
