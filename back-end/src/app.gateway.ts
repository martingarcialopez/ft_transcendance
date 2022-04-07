import {
 SubscribeMessage,
 WebSocketGateway,
 OnGatewayInit,
 WebSocketServer,
 OnGatewayConnection,
 OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

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
 private logger: Logger = new Logger('AppGateway');

/*this Decorator is used to listen to incoming messages*/
@SubscribeMessage('msgToServer')
/*send data to all clients connected to the server*/
 handleMessage(client: Socket, payload: string): void {
	 this.server.emit('msgToClient', payload);
	 this.logger.log(payload);
 }

 afterInit(server: Server) {
  this.logger.log('Init');
 }

 handleDisconnect(client: Socket) {
  this.logger.log(`Client disconnected: ${client.id}`);
 }

	handleConnection(client: Socket, ...args: any[]) {
  this.logger.log(`Client connected: ${client.id}`);
 }
}
