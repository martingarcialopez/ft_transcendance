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

const ROOMS_LIST = [
	{
		'roomName': 'Cat ambassy',
		'roomId': 42,
		'roomType': 'public',
		'image': 'https://img.freepik.com/free-vector/pink-cat-head-with-angry-face-with-revenge-vector-illustration-carton-emoticon-doodle-icon-drawing_10606-1569.jpg?w=200-',
		'participants': [
			{
				'userId': 100,
				'userName': 'Meilv',
				'avatar': 'https://cdn2.iconfinder.com/data/icons/halloween-horror-1/512/35-black-cat-curse-mystery-512.png',
				'mute' : false ,
				'block' : false,
			},
			{
				'userId': 200,
				'userName': 'Sesame',
				'avatar': 'https://cdn3.iconfinder.com/data/icons/animal-40/128/Animal_Tiger_Leopard-512.png',
				'mute' : false ,
				'block' : false,
			},
			{
				'userId': 300,
				'userName': 'Maobe',
				'avatar': 'https://cdn4.iconfinder.com/data/icons/animals-177/512/Caticorn-512.png',
				'mute' : false ,
				'block' : false,
			},
			{
				'userId': 400,
				'userName': 'Xibao',
				'avatar': 'https://cdn2.iconfinder.com/data/icons/japan-flat-2/340/japan_monk_asia_religion_buddhist_zen_japanese_traditional-512.png',
				'mute' : false ,
				'block' : false,

			},
		]
	},
	{
		'roomName': 'Blue team',
		'roomId': 888,
		'roomType': 'private',
		'image': 'https://stickershop.line-scdn.net/stickershop/v1/product/7594755/LINEStorePC/main.png;compress=true',
		'participants': [
			{
				'userId': 100,
				'userName': 'Meilv',
				'avatar': 'https://cdn2.iconfinder.com/data/icons/halloween-horror-1/512/35-black-cat-curse-mystery-512.png',
				'mute' : false,
				'block' : false,
			},
			{
				'userId': 400,
				'userName': 'Xibao',
				'avatar': 'https://cdn2.iconfinder.com/data/icons/japan-flat-2/340/japan_monk_asia_religion_buddhist_zen_japanese_traditional-512.png',
				'mute' : false,
				'block' : false,
			},
		]
	},
	{
		'roomName': 'Yellow team',
		'roomId': 666,
		'roomType': 'private',
		'image': 'https://c8.alamy.com/comp/2H5Y6BE/smile-yellow-kitten-head-2H5Y6BE.jpg',
		'participants': [
			{
				'userId': 200,
				'userName': 'Sesame',
				'avatar': 'https://cdn3.iconfinder.com/data/icons/animal-40/128/Animal_Tiger_Leopard-512.png',
				'mute' : false,
				'block' : false,
			},
			{
				'userId': 300,
				'userName': 'Maobe',
				'avatar': 'https://cdn4.iconfinder.com/data/icons/animals-177/512/Caticorn-512.png',
				'mute' : false,
				'block' : false,
			},
		]
	},
]

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
		const roomId = message.roomId;
		const content = message.content;
		try {
			var res = await this.messageService.createMessage(message);
			this.server.to(roomId.toString())
				// .emit('B_createMessage',  {'roomId': roomId,
				// 						   'message': {
				// 							   'userId': userId,
				// 							   'content': content,
				// 							   'date': '11/05/2020',
			// 						   }
				.emit('B_createMessage', res);
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
