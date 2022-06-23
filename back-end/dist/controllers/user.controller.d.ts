/// <reference types="multer" />
import { CreateUserDto } from '../dtos/in/CreateUser.dto';
import { UpdateUserDto } from 'src/dtos/in/UpdateUser.dto';
import { User } from '../models/user.entity';
import { UserService } from '../services/user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    uploadProfileImage(uploadedFile: Express.Multer.File, req: any): {
        originalname: string;
        filename: string;
    };
    getAllUsers(): Promise<string[]>;
    createUser(body: CreateUserDto): Promise<any>;
    getCurrentUser(req: any): Promise<User>;
    getUserFriends(req: any): Promise<import("../models/friends.entity").Relationship[]>;
    addFriend(req: any, username: string): Promise<void>;
    deleteFriend(req: any, username: string): Promise<void>;
    getUser(username: string): Promise<User>;
    updateUser(body: UpdateUserDto, id: string): Promise<User>;
    deleteUser(id: string): Promise<void>;
    getAllGames(): Promise<import("../models/gamehistory.entity").GameHistory[]>;
    getUserGames(username: string): Promise<import("../models/gamehistory.entity").GameHistory[]>;
}
