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
import { Room } from './models/room.entity';
import { Participant } from './models/participant.entity';
import { NestGateway } from '@nestjs/websockets/interfaces/nest-gateway.interface';
import { Bind, UseInterceptors } from '@nestjs/common';
import { MessageService } from './services/message.service';
import { ParticipantService } from './services/participant.service';
import { RoomService } from './services/room.service';
import { Logger, Body } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { MessageDto } from './dtos/in/message.dto';
import { RoomDto } from './dtos/in/room.dto';
import { ParticipantDto } from './dtos/in/participant.dto';
import { RoomSnippetDto } from './dtos/in/RoomSnippetDto.dto';

/*this declarator gives us access to the socket.io functionality*/
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@WebSocketGateway()

//implement 3 interface to log key status
export class MessageGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  /*gives us access to the websockets server instance*/
  @WebSocketServer() server: Server;

  constructor(
    private readonly messageService: MessageService,
    private readonly roomService: RoomService,
    private readonly participantService: ParticipantService,
  ) {}

  private logger: Logger = new Logger('AppGateway');

  /*
	      CONNECTIONS
	 */
  async handleConnection(server: Server) {
    this.logger.log('ONLINE!!!!!!!!!!!!!!!');

    const roomIds = await this.participantService.getUseridRooms(2);
    console.log(roomIds);
    // this.server.emit('msgToClient', users);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  /*
	      MESSAGES
	 */
  @Bind(MessageBody(), ConnectedSocket()) // useful?
  @SubscribeMessage('createMessage')
  async createMessage(@Body() message: MessageDto): Promise<void> {
    console.log('MessageDto: ', MessageDto);
    var value = await this.messageService.createMessage(message[0]);
    console.log('message id is ', value);

    // Send message_id to front
    this.server.emit('SendMsg', value);
    // Send message infos to everyone but original sender
    this.server
      .to(message[0].channelIdDst.toString())
      .emit('MsgToClient: ', message[0].contentToSend);
  }

  /*get all messages from a room*/
  @SubscribeMessage('getMessage')
  async getMessage(room_id: number) {
    const all_message = await this.messageService.getRoomMessage(room_id);
    this.server.emit('msgToClient', all_message);
  }

  @SubscribeMessage('deleteMessage')
  async deleteMessage(id: number) {
    await this.messageService.deleteMessage(id);
  }

  /*
	      ROOMS
	 */
  @SubscribeMessage('createRoom')
  async createRoom(@Body() body: RoomDto): Promise<void> {
    const value = await this.roomService.createRoom(body);
    console.log('return value is ', value);
    this.server.emit('idRoom', value);
  }

  /*get all user in the given id room*/
  @SubscribeMessage('getRoom')
  async getRoom(socket: Socket, room_id: number) {
    console.log('in getRoom ', room_id);
    socket.join(room_id.toString());
    //		const all_room =  await this.roomService.getRoom(8);
  }

  @SubscribeMessage('deleteRoom')
  async deleteRoom(id: number) {
    await this.roomService.deleteRoom(id);
  }

  /*
	      PARTICIPANTS
	 */
  @SubscribeMessage('createParticipant')
  async createParticipant(participant: ParticipantDto) {
    const value = await this.participantService.createParticipant(participant);
  }

  @SubscribeMessage('getParticipant')
  async getParticipant(room_id: number) {
    const all_participant = await this.participantService.getParticipant(
      room_id,
    );
  }

  @SubscribeMessage('getUseridRooms')
  async getUseridRooms(userId: any) {
    console.log('catched?');
    const rooms = await this.participantService.getUseridRooms(userId);
    console.log('i am here', rooms);
  }

  @SubscribeMessage('deleteParticipant')
  async deleteParticipant(id: number) {
    await this.participantService.deleteParticipant(id);
  }
}
