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
import { Chat } from './models/chat.entity';
import { NestGateway } from '@nestjs/websockets/interfaces/nest-gateway.interface';
import { Bind, UseInterceptors } from '@nestjs/common';
import {ChatService} from './services/chat.service';
import { Logger, Body } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { ChatDto } from './dtos/in/chat.dto'

/*this declarator gives us access to the socket.io functionality*/
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})

//implement 3 interface to log key status
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

/*gives us access to the websockets server instance*/
@WebSocketServer() server: Server;

constructor(
    private readonly chatService: ChatService
  ) {
  }

 private logger: Logger = new Logger('AppGateway');

@Bind(MessageBody(), ConnectedSocket())
  @SubscribeMessage('msgToServer')
  async handleNewMessage(chat: Chat) {
    console.log('New Chat 888', chat.content);
      const value = await this.chatService.saveChat(chat);
      this.server.emit('msgToClient', value);
  }


async handleConnection(server: Server){
  	this.logger.log('ONLINE!!!!!!!!!!!!!!!');
	const message =  await this.chatService.getChat();
	this.server.emit('msgToClient', message);
}

 afterInit(server: Server) {
  this.logger.log('Init');
 }

 handleDisconnect(client: Socket) {
  this.logger.log(`Client disconnected: ${client.id}`);
 }
}
