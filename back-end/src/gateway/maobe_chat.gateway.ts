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
		console.log(message);
		const userId: number = Number(socket.handshake.headers.userid);
		message.userId = userId;
		try {
			var res = await this.messageService.createMessage(message);
			// this.server.to(message.roomId.toString()).emit('B_createMessage', res);
			this.server.emit('B_createMessage', res);
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
	updateMessage(socket: Socket, roomId: number): boolean {
		const firstRoomId = 42;
		if (roomId === -1) {
			roomId = firstRoomId;
		}
		const allMessages = {
			42: [
				{
					'userId': 100,
					'content': 'Coucou je suis Meilv !! <3',
					'date': '11/05/2020',
				},
				{
					'userId': 300,
					'content': '<3 Ai ni <3',
					'date': '11/05/2020',
				},
				{
					'userId': 200,
					'content': 'J\'ai faim :(',
					'date': '11/05/2020',
				},
				{
					'userId': 400,
					'content': 'Time to chi!',
					'date': '11/05/2020',
				},
			],
			666: [
				{
					'userId': 200,
					'content': 'Meilv bully me :\'(',
					'date': '09/05/2020',
				},
				{
					'userId': 300,
					'content': 'You can hiss her, she\'ll run away petit bao',
					'date': '09/05/2020',
				},
				{
					'userId': 200,
					'content': 'I\'m still a bao, she should not treat me as a dog!!!',
					'date': '09/05/2020',
				},
				{
					'userId': 300,
					'content': 'kekelianlian <3',
					'date': '09/05/2020',
				},
			],
			888: [
				{
					'userId': 100,
					'content': 'Xiao di really like to bother me when I eat...',
					'date': '09/05/2020',
				},
				{
					'userId': 400,
					'content': 'nigama is the same with me',
					'date': '09/05/2020',
				},
				{
					'userId': 100,
					'content': 'still love them tho',
					'date': '09/05/2020',
				},
				{
					'userId': 400,
					'content': 'so much <3',
					'date': '09/05/2020',
				},
				{
					'userId': 100,
					'content': 'miss mama and youuuu. When will you come back ?',
					'date': '13/05/2020',
				},
				{
					'userId': 400,
					'content': 'very soon, we are in the train',
					'date': '13/05/2020',
				},
				{
					'userId': 100,
					'content': 'don\'t forger to buy some petit faims 66666666666',
					'date': '13/05/2020',
				},
			]
		}
		this.server.emit('B_getMessages', {'roomId': roomId,
										   'messages': allMessages[roomId]});
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
