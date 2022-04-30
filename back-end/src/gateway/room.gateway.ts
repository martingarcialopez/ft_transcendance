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
import { Room } from '../models/room.entity';
import { NestGateway } from '@nestjs/websockets/interfaces/nest-gateway.interface';
import { Bind, UseInterceptors } from '@nestjs/common';
import { RoomService } from '../services/room.service';
import { Logger, Body } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { RoomDto } from '../dtos/in/room.dto';

/*this declarator gives us access to the socket.io functionality*/
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})

/*
** implement 3 interface to log key status
*/
export class RoomGateway
{
  /*gives us access to the websockets server instance*/
  @WebSocketServer() server: Server;

  constructor(
    private readonly roomService: RoomService,
  ) {}

  @SubscribeMessage('createRoom')
  async createRoom(@Body() body: RoomDto): Promise<void> {
    const value = await this.roomService.createRoom(body);
    console.log('return value is ', value);
    this.server.emit('idRoom', value);
  }

  /*get all user in the given id room*/
  @SubscribeMessage('getRoom')
  async getRoom(socket: Socket, room_id: number) {
    socket.join(room_id.toString());
  }

  @SubscribeMessage('deleteRoom')
  async deleteRoom(id: number) {
    await this.roomService.deleteRoom(id);
  }
}
