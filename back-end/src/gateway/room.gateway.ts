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
import { JoinRoomDto } from '../dtos/in/JoinRoom.dto';
import { RoomPwDto } from '../dtos/in/room_password.dto';
import { UpdateAdminDto } from '../dtos/in/update_admin.dto';


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

	/*pour qu'un utilisateur puisse rejoindre une room deja existante*/
	@SubscribeMessage('JoinRoom')
	async JoinRoom(@Body() body: JoinRoomDto): Promise<void> {
		const have_access = await this.roomService.joinRoom(body);
		/*need front send me event name
		this.server.emit('', have_access);*/
	}


	/*already a member in the room*/
  @SubscribeMessage('getRoom')
  async getRoom(socket: Socket, room_id: number) {
    socket.join(room_id.toString());
  }

  @SubscribeMessage('deleteRoom')
  async deleteRoom(id: number) {
    await this.roomService.deleteRoom(id);
  }

	@SubscribeMessage('updateRoomPw')
	async updateRoomPw(): Promise<void> {
		// const body: RoomPwDto = {'userName':'string', 'roomId':22, 'password': '999'};
		// let res = await this.roomService.updateRoomPw(body);
		//NEED TO SEND TO FRONT AN EVENT
//		return res;
	}

	//NEED TO RETURN BOOLEAN, WILL DO IT LATER
	@SubscribeMessage('deleteRoomPw')
	async deleteRoomPw(): Promise<void> {
		const body: RoomPwDto = {'userName':'string', 'roomId':21, 'password': ''};
		let res = await this.roomService.deleteRoomPw(body);
		//-----SEND TO FRONT---
		//this.server.emit('msgToClient', res);
	}

	@SubscribeMessage('manageAdmin')
	//	async manageAdmin(@Body() body: UpdateAdminDto): Promise<void> {
	async manageAdmin(): Promise<void> {
		// const body: UpdateAdminDto = {'userName':'miaomiao', 'roomId':22, 'toAdd': false};
	//	await this.roomService.manageAdmin(body);
	}

}
