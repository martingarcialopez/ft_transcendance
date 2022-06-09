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

import { MaobeRoomService } from '../services/maobe_room.service';
import { MaobeParticipantService } from '../services/maobe_participant.service';
import { RoomDto } from '../dtos/in/maobe_room.dto';



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
	) {}


	@SubscribeMessage('F_getRooms')
	async handleMessage(client: Socket, payload: string): Promise<boolean> {
		console.log('Message received for user: ', client.handshake.headers.userid);
		let userId : number = Number(client.handshake.headers.userid);
		try{
			const rooms = await this.roomService.maobe_getJoinRooms(userId);
			console.log('---', rooms);
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
		console.log(`Deleting room ${roomId}`);
		return (true);
	}

	@SubscribeMessage('F_banUser')
	banUser(socket: Socket, infos: any): boolean {
		console.log(`Baning ${infos}`);
		return (true);
	}

	@SubscribeMessage('F_getAvailableUsers')
	async getUsers(socket: Socket): Promise<boolean> {
		let userId : number = Number(socket.handshake.headers.userid);
		console.log(`Getting ${userId}`);
		try {
			const users = await this.roomService.getAvailableUsers(userId);
			socket.emit('B_getAvailableUsers', users);
		}
		catch(e)
		{
			return false;
		}
		return true;
	}

	@SubscribeMessage('F_getRoomAvailableUsers')
	getRoomUsers(socket: Socket, userId: number): boolean {
		console.log(`Getting ${userId}`);
		this.server.emit('B_getRoomAvailableUsers', false);
		return true;
	}

	@SubscribeMessage('F_muteUser')
	muteUser(socket: Socket, infos: any): boolean {
		console.log(`Muting ${infos}`);
		return (true);
	}

	@SubscribeMessage('F_blockUser')
	blockUser(socket: Socket, infos: any): boolean {
		console.log(`Blocking ${infos}`);
		return (true);
	}

	@SubscribeMessage('F_directMessage')
	directMessage(socket: Socket, infos: any): boolean {
		console.log(`directMessage ${infos}`);
		console.log('i am here!!!!!')
		return (true);
	}

	@SubscribeMessage('F_createMessage')
	createMessage(socket: Socket, message: any): any {
		const roomId = message.roomId;
		const content = message.content;
		const userId = message.userId;
		console.log(`Creating message ${content} in ${roomId} for ${userId}`);
		if (true) {
			this.server.emit('B_createMessage',  {'roomId': roomId,
												  'message': {
													  'userId': userId,
													  'content': content,
													  'date': '11/05/2020',
												  }
												 });
			return true;
		}
		return ({
			'status': 'KO',
			'msg': 'Something went wrong.'
		});
	}

	// @SubscribeMessage('F_createRoom')
	// createRoom(socket: Socket, room: any): any {
	// 	console.log(`Creating room ${room}`);
	// 	if (true) {
	// 		this.server.emit('B_createRoom',  {
	// 			'roomName': room.roomName,
	// 			'roomId': 8686,
	// 			'image': 'https://cdn3.iconfinder.com/data/icons/future-pack/64/023-artificial-heart-cyber-electronic-512.png',
	// 			'roomType': room.roomType,
	// 			'participants': room.users
	// 		});
	// 		console.log('Returning stuuff');
	// 		return true;
	// 	}
	// 	return ({
	// 		'status': 'KO',
	// 		'msg': 'Something went wrong.'
	// 	});
	// }

	@SubscribeMessage('F_updateRoom')
	updateRoom(socket: Socket, roomInfos: any): boolean {
		console.log(`Updating room with: ${roomInfos}`);
		const currRoom = ROOMS_LIST.filter((obj) => obj.roomId === roomInfos.roomId)[0];
		currRoom.participants = [...currRoom.participants, ...roomInfos.newParticipants];
		if (true) {
			this.server.emit('B_updateRoom',  {
				'roomName': roomInfos.roomName,
				'roomId': roomInfos.roomId,
				'image': currRoom.image,
				'roomType': roomInfos.roomType,
				'participants': currRoom.participants
			});
			console.log('Returning stuuff');
			return true;
		}
		return (false);
	}

	@SubscribeMessage('F_getMessages')
	updateMessage(socket: Socket, roomId: number): boolean {
		console.log(`Getting message for ${roomId}`);
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
