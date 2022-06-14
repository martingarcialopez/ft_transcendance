import {
	SubscribeMessage,
	WebSocketGateway,
	OnGatewayInit,
	WebSocketServer,
	OnGatewayConnection,
	OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger, Body } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { NestGateway } from '@nestjs/websockets/interfaces/nest-gateway.interface';
import { Bind, UseInterceptors } from '@nestjs/common';

import { MaobeRoom } from '../models/maobe_room.entity';
import { MaobeRoomService } from '../services/maobe_room.service';
import { MaobeParticipantService } from '../services/maobe_participant.service';
import { RoomDto } from '../dtos/in/maobe_room.dto';
import { MaobeMessageService } from '../services/maobe_message.service';
import { UserService } from '../services/user.service';


@WebSocketGateway({
	cors: {
		origin: '*',
	},
})
export class MaobeChatGateway {

	@WebSocketServer() server: Server;

	constructor(
		private readonly participantService: MaobeParticipantService,
		private readonly roomService: MaobeRoomService,
		private readonly messageService: MaobeMessageService,
		private readonly userService: UserService,
	) {}


	@SubscribeMessage('F_getRooms')
	async handleMessage(client: Socket, payload: string): Promise<boolean> {
		let userId : number = Number(client.handshake.headers.userid);
		try{
			const rooms = await this.roomService.maobe_getJoinRooms(userId);
			client.emit('B_getRooms', rooms);
		}
		catch(e) {
			return false;
		}
		return true;
	}

	@SubscribeMessage('F_createRoom')
	async createRoom(client: Socket, body: RoomDto) : Promise<boolean> {
		let userId : number = Number(client.handshake.headers.userid);
		try {
			const new_room = await this.roomService.maobe_createRoom(userId, body);
			client.emit('B_createRoom', new_room);
		}
		catch(e) {
			return false;
		}
		return true;
	}


	@SubscribeMessage('F_deleteMessage')
	deleteRoom(socket: Socket, roomId: number): boolean {
		return (true);
	}

	@SubscribeMessage('F_banUser')
	banUser(socket: Socket, infos: any): boolean {
		return (true);
	}

	@SubscribeMessage('F_getAvailableUsers')
	async getUsers(socket: Socket): Promise<boolean> {
		let userId : number = Number(socket.handshake.headers.userid);
		try {
			const users = await this.roomService.get_AvailableUsers(userId);
			socket.emit('B_getAvailableUsers', users);
		}
		catch(e)
		{
			return false;
		}
		return true;
	}

	@SubscribeMessage('F_getRoomAvailableUsers')
	async getRoomUsers(socket: Socket, roomId: number): Promise<boolean> {
		const userId: number = Number(socket.handshake.headers.userid);
		try{
			const users = await this.roomService.getRoom_AvailableUsers(userId, roomId);
			this.server.emit('B_getRoomAvailableUsers', users);
		}
		catch(e){
			return false;
		}
		return true;
	}

	@SubscribeMessage('F_getDispoRooms')
	async getDispoRooms(socket: Socket) : Promise<boolean> {
		const userId: number = Number(socket.handshake.headers.userid);
		try{
            const rooms : MaobeRoom[] = await this.roomService.getDispoRooms(userId);
            socket.emit('B_getDispoRooms', rooms);
        }
        catch(e){
            return false;
        }
        return true;
	}

	@SubscribeMessage('F_joinRoom')
    async createParticipant(socket: Socket, roomId: number): Promise<boolean> {
		const userId: number = Number(socket.handshake.headers.userid);
		try {
			var info:any[] = await this.roomService.createParticipant({'userId': userId, 'roomId': roomId});
			socket.emit('B_joinRoom', info);
		}
		catch(e){
            return false;
        }
        return true;
    }


	@SubscribeMessage('F_muteUser')
	muteUser(socket: Socket, infos: any): boolean {
		return (true);
	}

	@SubscribeMessage('F_blockUser')
	blockUser(socket: Socket, infos: any): boolean {
		return (true);
	}

	@SubscribeMessage('F_directMessage')
	directMessage(socket: Socket, infos: any): boolean {
		console.log(`directMessage ${infos}`);
		console.log('i am here!!!!!')
		return (true);
	}

	@SubscribeMessage('F_createMessage')
	async createMessage(socket: Socket, message: any): Promise<boolean> {
		const userId: number = Number(socket.handshake.headers.userid);
		message.userId = userId;
		try {
			var res = await this.messageService.createMessage(message);
			this.server.to(message.roomId.toString()).emit('B_createMessage', res);
			return true;
		}
		catch (e)
		{
			return false;
		}
	}

	@SubscribeMessage('F_updateRoom')
	async updateRoom(socket: Socket, roomInfos: any): Promise<boolean> {
		try {
            const update_room = await this.roomService.maobe_updateRoom(roomInfos);
            socket.emit('B_updateRoom', update_room);
        }
         catch(e) {
             return false;
         }
        return true;
	}

	@SubscribeMessage('F_getMessages')
	async getMessage(socket: Socket, roomId: number): Promise<boolean> {
		socket.join(roomId.toString());
		const allMessages = await this.roomService.maobe_getMessages(roomId);
		this.server.emit('B_getMessages', {'roomId': roomId,
										   'messages': allMessages
										  });
		return (true);
	}
}

interface I_Room {
	roomName: string,
	roomId: number,
	image: string,
	roomType: string,
	participants: any[];
}
