import { HttpStatus, HttpException, Injectable, NotFoundException, BadRequestException, HttpCode } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { RelationId, Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/in/CreateUser.dto';
import { ParticipantDto } from '../dtos/in/participant.dto';
import { BlockUserDto } from '../dtos/in/blockUser.dto';
import { User } from '../models/user.entity';
import { Relationship } from '../models/friends.entity';
import { unlinkSync } from 'fs';
import * as bcrypt from 'bcrypt';
import { GameHistory } from '../models/gamehistory.entity';
import { Multer } from 'multer';
import * as fs from "fs";
import { isNull, promisify } from 'util';
import { friendsStatusDto } from 'src/dtos/out/friendsStatus.dto';
import * as typeorm from "typeorm";
import { type } from 'os';
import { allUsersDto } from 'src/dtos/out/allUsers.dto';
import { Matchmaking } from 'src/models/matchmaking.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Relationship)
        private friendsRepository: Repository<Relationship>,
        @InjectRepository(GameHistory)
        private GameHistoryRepository: Repository<GameHistory>,
        @InjectRepository(Matchmaking)
        private MatchmakingRepository: Repository<Matchmaking>
    ) { }

    async getAllUsers() {

        const all = await this.userRepository.find();

        var allUsers: Array<allUsersDto> = [];

        var userInfo: allUsersDto;

        for (const user of all) {
            // console.log(`username is ${user.username} and avatar is ${user.avatar}`)
            userInfo = new allUsersDto();
            userInfo.username = user.username;
            userInfo.avatar = user.avatar;
            allUsers.push(userInfo);
        }

        return allUsers;
    }

    async createUser(payload: CreateUserDto): Promise<any> {

        const existing_user = await this.userRepository.findOne({ username: payload.username });

        if (existing_user)
            throw new HttpException('username already in use', HttpStatus.CONFLICT);

        const user = new User();
        user.firstname = payload.firstname;
        user.lastname = payload.lastname;
        user.username = payload.username;
        user.avatar = payload.avatar;
        // user.email = payload.email;
        user.twofa = false;

        const saltOrRounds = 10;
        const hash = await bcrypt.hash(payload.password, saltOrRounds);
        user.password = hash;

        user.login42 = null;

        const db_user: User = await this.userRepository.save(user);
        const { password, ...result } = db_user;
        return result;
    }

    async create42User(user: User): Promise<User> {

        return await this.userRepository.save(user);
    }

    async getUser(user: string): Promise<User> {
        return await this.userRepository.findOne({ username: user });
    }

    async getUserById(id: string): Promise<User> {
        return await this.userRepository.findOne(id);
    }

    async getUserBy42Login(user: string): Promise<User> {
        return await this.userRepository.findOne({ login42: user });
    }

    async updateUser(body: Partial<User>, id: string): Promise<User> {

        let user = new User();
        if (!(user = await this.userRepository.findOne(id)))
            throw new NotFoundException();

        if (body.password) {
            const saltOrRounds = 10;
            body.password = await bcrypt.hash(body.password, saltOrRounds);
        }
        if (!body.id)
            Object.assign(user, body);
        else
            throw new BadRequestException('Cannot overwrite user id');

        
        if (body.username) {
            const userExist = await this.getUser(body.username);
            if (userExist && userExist.username != user.username)
                throw new BadRequestException('Username already exists');
        }
    
        return this.userRepository.save(user);
    }

    async deleteUser(id: string) {

        const user: User = await this.getUserById(id);

        if (!user)
            throw new HttpException('user not found', HttpStatus.NOT_FOUND); // user does not exist

        if (user.avatar) {

        const unlinkAsync = promisify(fs.unlink)

        const files: string[] = fs.readdirSync("public/shared/avatar");

        files.forEach(file => {
            const filename = file.split('.').slice(0, -1).join('.');
            if (filename === user.username)
                unlinkAsync(`public/shared/avatar/${file}`);
        });



        }

        await this.friendsRepository.delete({ member_username: user.username});
        await this.friendsRepository.delete({ friend_username: user.username});

        await this.GameHistoryRepository.delete( { leftPlayer: user.username} );
        await this.GameHistoryRepository.delete( { rightPlayer: user.username} );

        await this.MatchmakingRepository.delete( { userId: user.id } );

        await this.userRepository.delete(id);
    }

    @HttpCode(200)
    async addFriend(userId: string, friendUsername: string) {

        const member: User = await this.getUserById(userId);
        const friend: User = await this.getUser(friendUsername);

         if (!member || !friend)
             throw new NotFoundException();

        const existingRelation = await this.friendsRepository.find(
            { where: { member_username: member.username, friend_username: friendUsername } });

         if (existingRelation.length)
             return ;

        const relation: Relationship = new Relationship();

        relation.member_username = member.username;
        relation.friend_username = friendUsername;

        await this.friendsRepository.save(relation);

    }

    async deleteFriend(userId: string, friendUsername: string) {

        const relation: Relationship = new Relationship();

        const user: User = await this.getUserById(userId);

        if (!user)
            throw new NotFoundException();

        console.log(`deleting relation where user is ${user.username} and friend is ${friendUsername}`);

        await this.friendsRepository.delete({ member_username: user.username, friend_username: friendUsername });

    }

    async getUserFriends(userId: string) {

        const user: User = await this.getUserById(userId);

        if (!user)
            throw new NotFoundException();

        const reponse = await this.friendsRepository.find({ where: { member_username: user.username } });

        if (!reponse)
            throw new NotFoundException();

        var allUsernames: Array<string> = [];

        for (const user of reponse) {
            // console.log(user.friend_username);
            allUsernames.push(user.friend_username);
        }

        return allUsernames;
    }

    async getUserFriendsStatus(username: string) {

        const user: User = await this.getUser(username);

        if (!user)
            throw new NotFoundException();

        const reponse = await this.friendsRepository.find({ where: { member_username: user.username } });

        if (!reponse)
            throw new NotFoundException();

        var allUsernames: Array<string> = [];

        for (const user of reponse) {
            // console.log(user.friend_username);
            allUsernames.push(user.friend_username);
        }

        let friendsStatus: Array<friendsStatusDto> = [];

        for (const user of allUsernames) {

            const dbUser = await this.userRepository.findOne( { username: user } );

            let tmp: friendsStatusDto = new friendsStatusDto();

            tmp.username = user;
            tmp.status = dbUser.status;
            tmp.avatar = dbUser.avatar
            friendsStatus.push(tmp);
        }

        return friendsStatus;

    }

    async getUserGames(username: string) {

        const user: User = await this.getUser(username);

        if (!user)
            throw new NotFoundException();

        const games = await this.GameHistoryRepository.find(
            {
                where : 
                [
                    { leftPlayer: username, winner: typeorm.Not(typeorm.IsNull()) },
                    { rightPlayer: username, winner: typeorm.Not(typeorm.IsNull()) }
                ]
            });

        return games;
    }


    async getAllGames() {

        return await this.GameHistoryRepository.find( { where : { winner: typeorm.Not(typeorm.IsNull()) } } );
    }

    async getBlockList(userId: number): Promise<number[]> | null {

        let user: User = await this.userRepository.createQueryBuilder("user")
            .select(["user.blockList"])
            .where("user.id = :user_Id", { user_Id: userId })
            .getOne();
        if (user == null)
            return null;
        return user['blockList'];
    }

    async blockUser(body: BlockUserDto): Promise<void> {
        if (body.userId == body.blockUserId)
            return;
        let blockList: number[] | null = await this.getBlockList(body.userId);
        console.log('blockList: ', blockList);
        if (blockList == null)// the user is invalid
            return;
        blockList.push(body.blockUserId);
        await this.userRepository
            .createQueryBuilder()
            .update("User")
            .set({ blockList: blockList })
            .where("id = :id", { id: body.userId })
            .execute();
    }

    uploadProfileImage(req, uploadedFile: Express.Multer.File) {

        if (!uploadedFile || !uploadedFile.filename)
            throw new BadRequestException();

        const unlinkAsync = promisify(fs.unlink)

        const files: string[] = fs.readdirSync("public/shared/avatar");

        const uploadedFileName = uploadedFile.filename.split('.').slice(0, -1).join('.');
        const uploadedFileExtension = uploadedFile.filename.split('.').pop();

        files.forEach(file => {
            const filename = file.split('.').slice(0, -1).join('.');
            const extension = file.split('.').pop();
            if (filename === uploadedFileName && extension != uploadedFileExtension)
                unlinkAsync(`public/shared/avatar/${file}`);
        });

        // console.log(files);

        const response = {
            originalname: uploadedFile.originalname,
            filename: `/shared/avatar/${uploadedFile.filename}`,
        };

        this.updateUser({ avatar: `/shared/avatar/${uploadedFile.filename}` }, req.user.userId);

        console.log(`returning...`)
        console.log(response)

        return response;

    }

}
