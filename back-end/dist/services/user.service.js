"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../models/user.entity");
const friends_entity_1 = require("../models/friends.entity");
const bcrypt = require("bcrypt");
const gamehistory_entity_1 = require("../models/gamehistory.entity");
const fs = require("fs");
const util_1 = require("util");
const friendsStatus_dto_1 = require("../dtos/out/friendsStatus.dto");
const typeorm = require("typeorm");
const allUsers_dto_1 = require("../dtos/out/allUsers.dto");
const matchmaking_entity_1 = require("../models/matchmaking.entity");
let UserService = class UserService {
    constructor(userRepository, friendsRepository, GameHistoryRepository, MatchmakingRepository) {
        this.userRepository = userRepository;
        this.friendsRepository = friendsRepository;
        this.GameHistoryRepository = GameHistoryRepository;
        this.MatchmakingRepository = MatchmakingRepository;
    }
    async getAllUsers() {
        const all = await this.userRepository.find();
        var allUsers = [];
        var userInfo;
        for (const user of all) {
            userInfo = new allUsers_dto_1.allUsersDto();
            userInfo.username = user.username;
            userInfo.avatar = user.avatar;
            allUsers.push(userInfo);
        }
        return allUsers;
    }
    async createUser(payload) {
        const existing_user = await this.userRepository.findOne({ username: payload.username });
        if (existing_user)
            throw new common_1.HttpException('username already in use', common_1.HttpStatus.CONFLICT);
        const user = new user_entity_1.User();
        user.firstname = payload.firstname;
        user.lastname = payload.lastname;
        user.username = payload.username;
        user.avatar = payload.avatar;
        user.twofa = false;
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(payload.password, saltOrRounds);
        user.password = hash;
        user.login42 = null;
        const db_user = await this.userRepository.save(user);
        const { password } = db_user, result = __rest(db_user, ["password"]);
        return result;
    }
    async create42User(user) {
        return await this.userRepository.save(user);
    }
    async getUser(user) {
        return await this.userRepository.findOne({ username: user });
    }
    async getUserById(id) {
        return await this.userRepository.findOne(id);
    }
    async getUserBy42Login(user) {
        return await this.userRepository.findOne({ login42: user });
    }
    async updateUser(body, id) {
        let user = new user_entity_1.User();
        if (!(user = await this.userRepository.findOne(id)))
            throw new common_1.NotFoundException();
        if (body.password) {
            const saltOrRounds = 10;
            body.password = await bcrypt.hash(body.password, saltOrRounds);
        }
        if (!body.id)
            Object.assign(user, body);
        else
            throw new common_1.BadRequestException('Cannot overwrite user id');
        return this.userRepository.save(user);
    }
    async deleteUser(id) {
        const user = await this.getUserById(id);
        if (!user)
            throw new common_1.HttpException('user not found', common_1.HttpStatus.NOT_FOUND);
        if (user.avatar) {
            const unlinkAsync = (0, util_1.promisify)(fs.unlink);
            const files = fs.readdirSync("public/shared/avatar");
            files.forEach(file => {
                const filename = file.split('.').slice(0, -1).join('.');
                if (filename === user.username)
                    unlinkAsync(`public/shared/avatar/${file}`);
            });
        }
        await this.friendsRepository.delete({ member_username: user.username });
        await this.friendsRepository.delete({ friend_username: user.username });
        await this.GameHistoryRepository.delete({ leftPlayer: user.username });
        await this.GameHistoryRepository.delete({ rightPlayer: user.username });
        await this.MatchmakingRepository.delete({ userId: user.id });
        await this.userRepository.delete(id);
    }
    async addFriend(userId, friendUsername) {
        const member = await this.getUserById(userId);
        const friend = await this.getUser(friendUsername);
        if (!member || !friend)
            throw new common_1.NotFoundException();
        const existingRelation = await this.friendsRepository.find({ where: { member_username: member.username, friend_username: friendUsername } });
        if (existingRelation.length)
            return;
        const relation = new friends_entity_1.Relationship();
        relation.member_username = member.username;
        relation.friend_username = friendUsername;
        await this.friendsRepository.save(relation);
    }
    async deleteFriend(userId, friendUsername) {
        const relation = new friends_entity_1.Relationship();
        const user = await this.getUserById(userId);
        if (!user)
            throw new common_1.NotFoundException();
        console.log(`deleting relation where user is ${user.username} and friend is ${friendUsername}`);
        await this.friendsRepository.delete({ member_username: user.username, friend_username: friendUsername });
    }
    async getUserFriends(userId) {
        const user = await this.getUserById(userId);
        if (!user)
            throw new common_1.NotFoundException();
        const reponse = await this.friendsRepository.find({ where: { member_username: user.username } });
        if (!reponse)
            throw new common_1.NotFoundException();
        var allUsernames = [];
        for (const user of reponse) {
            allUsernames.push(user.friend_username);
        }
        return allUsernames;
    }
    async getUserFriendsStatus(username) {
        const user = await this.getUser(username);
        if (!user)
            throw new common_1.NotFoundException();
        const reponse = await this.friendsRepository.find({ where: { member_username: user.username } });
        if (!reponse)
            throw new common_1.NotFoundException();
        var allUsernames = [];
        for (const user of reponse) {
            allUsernames.push(user.friend_username);
        }
        let friendsStatus = [];
        for (const user of allUsernames) {
            const dbUser = await this.userRepository.findOne({ username: user });
            let tmp = new friendsStatus_dto_1.friendsStatusDto();
            tmp.username = user;
            tmp.status = dbUser.status;
            tmp.avatar = dbUser.avatar;
            friendsStatus.push(tmp);
        }
        return friendsStatus;
    }
    async getUserGames(username) {
        const user = await this.getUser(username);
        if (!user)
            throw new common_1.NotFoundException();
        const games = await this.GameHistoryRepository.find({
            where: [
                { leftPlayer: username, winner: typeorm.Not(typeorm.IsNull()) },
                { rightPlayer: username, winner: typeorm.Not(typeorm.IsNull()) }
            ]
        });
        return games;
    }
    async getAllGames() {
        return await this.GameHistoryRepository.find({ where: { winner: typeorm.Not(typeorm.IsNull()) } });
    }
    async getBlockList(userId) {
        let user = await this.userRepository.createQueryBuilder("user")
            .select(["user.blockList"])
            .where("user.id = :user_Id", { user_Id: userId })
            .getOne();
        if (user == null)
            return null;
        return user['blockList'];
    }
    async blockUser(body) {
        if (body.userId == body.blockUserId)
            return;
        let blockList = await this.getBlockList(body.userId);
        console.log('blockList: ', blockList);
        if (blockList == null)
            return;
        blockList.push(body.blockUserId);
        await this.userRepository
            .createQueryBuilder()
            .update("User")
            .set({ blockList: blockList })
            .where("id = :id", { id: body.userId })
            .execute();
    }
    uploadProfileImage(req, uploadedFile) {
        if (!uploadedFile || !uploadedFile.filename)
            throw new common_1.BadRequestException();
        const unlinkAsync = (0, util_1.promisify)(fs.unlink);
        const files = fs.readdirSync("public/shared/avatar");
        const uploadedFileName = uploadedFile.filename.split('.').slice(0, -1).join('.');
        const uploadedFileExtension = uploadedFile.filename.split('.').pop();
        files.forEach(file => {
            const filename = file.split('.').slice(0, -1).join('.');
            const extension = file.split('.').pop();
            if (filename === uploadedFileName && extension != uploadedFileExtension)
                unlinkAsync(`public/shared/avatar/${file}`);
        });
        const response = {
            originalname: uploadedFile.originalname,
            filename: `/shared/avatar/${uploadedFile.filename}`,
        };
        this.updateUser({ avatar: `/shared/avatar/${uploadedFile.filename}` }, req.user.userId);
        console.log(`returning...`);
        console.log(response);
        return response;
    }
};
__decorate([
    (0, common_1.HttpCode)(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "addFriend", null);
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(friends_entity_1.Relationship)),
    __param(2, (0, typeorm_1.InjectRepository)(gamehistory_entity_1.GameHistory)),
    __param(3, (0, typeorm_1.InjectRepository)(matchmaking_entity_1.Matchmaking)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map