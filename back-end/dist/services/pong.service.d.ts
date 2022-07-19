import { Repository } from 'typeorm';
import { Socket, Server } from 'socket.io';
import { Matchmaking } from '../models/matchmaking.entity';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { GameEntity } from '../models/game.entity';
import { UserService } from './user.service';
import { GameHistory } from 'src/models/gamehistory.entity';
import { User } from 'src/models/user.entity';
export declare class PongService {
    private readonly pongRepository;
    private gameHistoryRepository;
    private userRepository;
    private readonly gameService;
    private readonly userService;
    constructor(pongRepository: Repository<Matchmaking>, gameHistoryRepository: Repository<GameHistory>, userRepository: Repository<User>, gameService: InMemoryDBService<GameEntity>, userService: UserService);
    setSocketId(client: Socket, username: string): Promise<string>;
    handleDisconnect(client: Socket): Promise<void>;
    iDontWannaPlayAnymore(client: Socket, userId: number): Promise<void>;
    managePlayer(socket: Socket, server: Server, userId: number, difficulty: string, maxScore: number): Promise<void>;
    createCustomGame(userId: string, difficulty: string, maxScore: number): Promise<string>;
    joinPongRoom(client: Socket, server: Server, userId: string, roomId: string): Promise<void>;
    playGame(socket: Server, socketRoom: string, difficulty: string, player1Id: number, player2Id: number, winningScore: number): Promise<void>;
    registerMove(move: GameEntity): Promise<void>;
}
