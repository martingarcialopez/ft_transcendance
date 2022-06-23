import { Repository } from 'typeorm';
import { Socket, Server } from 'socket.io';
import { Matchmaking } from '../models/matchmaking.entity';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { GameEntity } from '../models/game.entity';
import { UserService } from './user.service';
import { GameHistory } from 'src/models/gamehistory.entity';
export declare class PongService {
    private readonly pongRepository;
    private gameHistoryRepository;
    private readonly gameService;
    private readonly userService;
    constructor(pongRepository: Repository<Matchmaking>, gameHistoryRepository: Repository<GameHistory>, gameService: InMemoryDBService<GameEntity>, userService: UserService);
    managePlayer(socket: Socket, server: Server, userId: number, difficulty: string): Promise<void>;
    playGame(socket: Server, socketRoom: string, difficulty: string): Promise<void>;
    registerMove(move: GameEntity): Promise<void>;
}
