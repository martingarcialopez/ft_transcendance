import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { PongService } from '../services/pong.service';
import { GameEntity } from 'src/models/game.entity';
import { lookingForAGameDto } from 'src/dtos/in/lookingForAGame.dto';
import { joinPongRoomDto } from 'src/dtos/in/joinPongRoom.dto';
import { UserService } from 'src/services/user.service';
export declare class PongGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly pongService;
    private userService;
    constructor(pongService: PongService, userService: UserService);
    server: Server;
    afterInit(server: Server): void;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    setSocketId(socket: Socket, username: string): Promise<string>;
    lookingForplay(socket: Socket, data: lookingForAGameDto): Promise<void>;
    iDontWannaPlayAnymore(socket: Socket, userId: number): void;
    join(socket: Socket, data: joinPongRoomDto): Promise<void>;
    moveAction(socket: Socket, move: GameEntity): Promise<void>;
}
