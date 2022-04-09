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
import { Message } from './models/message.entity';
import { NestGateway } from '@nestjs/websockets/interfaces/nest-gateway.interface';
import { Bind, UseInterceptors } from '@nestjs/common';
import {MessageService} from './services/message.service';
import { Logger, Body } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { MessageDto } from './dtos/in/message.dto'

/*this declarator gives us access to the socket.io functionality*/
@WebSocketGateway({
	cors: {
		origin: '*',
	},
})

//implement 3 interface to log key status
export class MessageGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

	/*gives us access to the websockets server instance*/
	@WebSocketServer() server: Server;

	constructor(
		private readonly messageService: MessageService
	) {
	}

	private logger: Logger = new Logger('AppGateway');

	@Bind(MessageBody(), ConnectedSocket())
	@SubscribeMessage('msgToServer')
	async handleNewMessage(message: Message) {
		console.log('New Message 888', message.content);
		const value = await this.messageService.saveMessage(message);
		this.server.emit('msgToClient', value);
	}


	async handleConnection(server: Server){
  		this.logger.log('ONLINE!!!!!!!!!!!!!!!');
		const all_message =  await this.messageService.getMessage();
		this.server.emit('msgToClient', all_message);
	}

	afterInit(server: Server) {
		this.logger.log('Init');
	}

	handleDisconnect(client: Socket) {
		this.logger.log(`Client disconnected: ${client.id}`);
	}
}
