/// <reference types="multer" />
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/in/CreateUser.dto';
import { BlockUserDto } from '../dtos/in/blockUser.dto';
import { User } from '../models/user.entity';
import { Relationship } from '../models/friends.entity';
import { GameHistory } from '../models/gamehistory.entity';
import { friendsStatusDto } from 'src/dtos/out/friendsStatus.dto';
import { allUsersDto } from 'src/dtos/out/allUsers.dto';
import { Matchmaking } from 'src/models/matchmaking.entity';
export declare class UserService {
    private userRepository;
    private friendsRepository;
    private GameHistoryRepository;
    private MatchmakingRepository;
    constructor(userRepository: Repository<User>, friendsRepository: Repository<Relationship>, GameHistoryRepository: Repository<GameHistory>, MatchmakingRepository: Repository<Matchmaking>);
    getAllUsers(): Promise<allUsersDto[]>;
    createUser(payload: CreateUserDto): Promise<any>;
    create42User(user: User): Promise<User>;
    getUser(user: string): Promise<User>;
    getUserById(id: string): Promise<User>;
    getUserBy42Login(user: string): Promise<User>;
    updateUser(body: Partial<User>, id: string): Promise<User>;
    deleteUser(id: string): Promise<void>;
    addFriend(userId: string, friendUsername: string): Promise<void>;
    deleteFriend(userId: string, friendUsername: string): Promise<void>;
    getUserFriends(userId: string): Promise<string[]>;
    getUserFriendsStatus(username: string): Promise<friendsStatusDto[]>;
    getUserGames(username: string): Promise<GameHistory[]>;
    getAllGames(): Promise<GameHistory[]>;
    getBlockList(userId: number): Promise<number[]> | null;
    blockUser(body: BlockUserDto): Promise<void>;
    uploadProfileImage(req: any, uploadedFile: Express.Multer.File): {
        originalname: string;
        filename: string;
    };
}
