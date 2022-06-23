import { Socket, Server } from 'socket.io';
import { PongDto } from '../dtos/in/pong.dto';
import { PongService } from '../services/pong.service';
import { GameEntity } from 'src/models/game.entity';
export declare class PongGateway {
    private readonly pongService;
    server: Server;
    constructor(pongService: PongService);
    lookingForplay(socket: Socket, data: any): Promise<void>;
    join(socket: Socket, pongDto: PongDto): Promise<void>;
    moveAction(socket: Socket, move: GameEntity): Promise<void>;
}
