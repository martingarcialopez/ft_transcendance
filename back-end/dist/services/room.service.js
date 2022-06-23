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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const RoomSnippetDto_dto_1 = require("../dtos/out/RoomSnippetDto.dto");
const user_entity_1 = require("../models/user.entity");
const room_entity_1 = require("../models/room.entity");
const participant_entity_1 = require("../models/participant.entity");
const class_transformer_1 = require("class-transformer");
const bcrypt = require("bcrypt");
const user_service_1 = require("./user.service");
const message_service_1 = require("./message.service");
const participant_service_1 = require("./participant.service");
let RoomService = class RoomService {
    constructor(roomRepository, participantRepository, userRepository) {
        this.roomRepository = roomRepository;
        this.participantRepository = participantRepository;
        this.userRepository = userRepository;
    }
    async createRoom(roomDto) {
        const new_room = new room_entity_1.Room();
        new_room.name = roomDto.name;
        new_room.typeRoom = roomDto.typeRoom;
        if (roomDto.password != null && roomDto.typeRoom == 'protected') {
            const password = roomDto.password;
            const saltOrRounds = 10;
            const hash = await bcrypt.hash(password, saltOrRounds);
            new_room.password = hash;
        }
        else
            new_room.password = null;
        if (new_room.owner == null)
            new_room.owner = [];
        new_room.owner.push(roomDto.creatorId);
        await this.roomRepository.save(new_room);
        await this.participantService.createParticipant({ 'userId': roomDto.creatorId, 'roomId': new_room.id });
        const dto = (0, class_transformer_1.plainToClass)(RoomSnippetDto_dto_1.RoomSnippetDto, new_room);
        return dto;
    }
    async getRoom(room_Id) {
        const room = await this.roomRepository.findOne(room_Id);
        const p = await this.roomRepository.createQueryBuilder("room")
            .select(["room.id", "room.name"])
            .leftJoinAndSelect("room.participants", "participant")
            .leftJoinAndSelect("participant.user", "user")
            .where("room.id = :room_Id", { room_Id: room_Id })
            .getOne();
        console.log('here in getRoom', p, 'and type of p is ', typeof p);
        return p;
    }
    async deleteRoom(id) {
        await this.roomRepository.delete(id);
    }
    async participant_already_exist(participantDto) {
        const userId = participantDto.userId;
        const roomId = participantDto.roomId;
        let res = await this.participantRepository.findOne({ userId: userId, roomId: roomId });
        if (res)
            return true;
        return false;
    }
    async joinRoom(joinRoomDto) {
        console.log('joinRoomDto: ', joinRoomDto);
        const typeRoom = joinRoomDto.typeRoom;
        const userId = joinRoomDto.userId;
        const roomId = joinRoomDto.roomId;
        let existing_user = false;
        if (typeRoom == 'public') {
            existing_user = await this.participant_already_exist({ 'userId': userId, 'roomId': roomId });
            if (existing_user)
                return false;
            await this.participantService.createParticipant({ 'userId': userId, 'roomId': roomId });
            return true;
        }
        else if (typeRoom == 'private') {
            console.log('enter in private room', roomId, userId);
            let is_admin = await this.userIsAdmin(roomId, userId);
            console.log('is_admin? ', is_admin);
            if (is_admin == false)
                return false;
            const login = joinRoomDto.login;
            const invitee_info = await this.userId_fromLogin(login);
            console.log('login', login);
            if (invitee_info == undefined)
                return false;
            const invite_id = invitee_info['id'];
            existing_user = await this.participant_already_exist({ 'userId': invite_id, 'roomId': roomId });
            if (existing_user || invite_id == userId)
                return false;
            await this.participantService.createParticipant({ 'userId': invite_id, 'roomId': roomId });
            return true;
        }
        else if (typeRoom == 'protected') {
            const entered_pw = joinRoomDto.password;
            const room_info = await this.roomRepository.createQueryBuilder("room")
                .select(["room.password"])
                .where("room.id = :room_Id", { room_Id: roomId })
                .getOne();
            if (await bcrypt.compare(entered_pw, room_info['password'])) {
                existing_user = await this.participant_already_exist({ 'userId': userId, 'roomId': roomId });
                if (existing_user)
                    return false;
                await this.participantService.createParticipant({ 'userId': joinRoomDto.userId, 'roomId': roomId });
                return true;
            }
        }
        return false;
    }
    async updateRoomPw(body) {
        console.log(body);
        let admin = await this.roomRepository.createQueryBuilder("room")
            .select(["room.owner"])
            .where("room.id = :room_Id", { room_Id: body.roomId })
            .getOne();
        if (admin && admin['owner'].indexOf(body.userId) != -1) {
            let room = await this.roomRepository.createQueryBuilder("room")
                .where("room.id = :room_Id", { room_Id: body.roomId })
                .getOne();
            let new_hashed_password = await this.get_hash_pw(body['password']);
            room['password'] = new_hashed_password;
            await this.roomRepository.save(room);
            return true;
        }
        return false;
    }
    async deleteRoomPw(body) {
        let room = await this.roomRepository.createQueryBuilder("room")
            .where("room.id = :room_Id", { room_Id: body.roomId })
            .getOne();
        room['password'] = null;
        if (room['typeRoom'] == 'protected')
            room['typeRoom'] = 'public';
        await this.roomRepository.save(room);
        console.log('here room', room);
        room = await this.roomRepository.createQueryBuilder("room")
            .where("room.id = :room_Id", { room_Id: body.roomId })
            .getOne();
        console.log('NOW room', room);
        return true;
    }
    async get_hash_pw(password) {
        const saltOrRounds = 10;
        return await bcrypt.hash(password, saltOrRounds);
    }
    async get_RoomAdmins(roomId) {
        let room = await this.roomRepository.createQueryBuilder("room")
            .select(["room.owner"])
            .where("room.id = :room_Id", { room_Id: roomId })
            .getOne();
        console.log('in get_RoomAdmins ', room, room.owner);
        return room.owner;
    }
    async userIsAdmin(roomId, userId) {
        let admins = await this.get_RoomAdmins(roomId);
        console.log('admins is here ', admins, admins.indexOf(userId));
        return await admins.indexOf(userId) != -1;
    }
    async manageAdmin(body) {
        let is_already_admin = await this.userIsAdmin(body.roomId, body.userId);
        let admins = await this.get_RoomAdmins(body.roomId);
        if (admins == undefined)
            return false;
        if (admins.indexOf(body.userId) == -1)
            return false;
        const login = body.login;
        const user_info = await this.userId_fromLogin(login);
        if (user_info == undefined)
            return false;
        let other_userId = user_info['id'];
        const other_user_is_admin = await this.userIsAdmin(body.roomId, other_userId);
        if (body['toAdd'] == true && other_user_is_admin == false)
            admins.push(other_userId);
        else if (body['toAdd'] == false && other_user_is_admin == true) {
            var index = admins.indexOf(other_userId);
            admins.splice(index, 1);
        }
        await this.roomRepository
            .createQueryBuilder()
            .update(room_entity_1.Room)
            .set({ owner: admins })
            .where("id = :id", { id: body.roomId })
            .execute();
        return true;
    }
    async AdminleaveRoom(body) {
        console.log('AdminleaveRoom');
        let is_already_admin = await this.userIsAdmin(body.roomId, body.userId);
        let admins = await this.get_RoomAdmins(body.roomId);
        if (is_already_admin == true) {
            var index = admins.indexOf(body.userId);
            admins.splice(index, 1);
            console.log('delete admin');
            await this.roomRepository
                .createQueryBuilder()
                .update(room_entity_1.Room)
                .set({ owner: admins })
                .where("id = :id", { id: body.roomId })
                .execute();
        }
    }
    async getRoomId(roomName) {
        let room = await this.roomRepository.createQueryBuilder("room")
            .select("room.id")
            .where("room.name = :roomName", { roomName: roomName })
            .getOne();
        console.log('here room ', room);
        return room.id;
    }
    async IsRoomName_Unique(roomName) {
        console.log(roomName);
        let names = await this.roomRepository.createQueryBuilder("room")
            .select("room.id")
            .where("room.name = :room_name", { room_name: roomName })
            .getOne();
        if (names != undefined)
            return false;
        return true;
    }
    async allRoomInfos() {
        let rooms = await this.roomRepository.createQueryBuilder("room")
            .leftJoinAndSelect("room.participants", "participant")
            .leftJoinAndSelect("participant.user", "user")
            .getMany();
        return rooms;
    }
    async userId_fromLogin(login) {
        console.log('login', login);
        const user_info = await this.userRepository.createQueryBuilder("user")
            .select(["user.id"])
            .where("user.login42 = :login", { login: login })
            .getOne();
        return user_info;
    }
    async get_Room_banList(roomId) {
        let room = await this.roomRepository.createQueryBuilder("room")
            .select(["room.banList"])
            .where("room.id = :room_Id", { room_Id: roomId })
            .getOne();
        console.log('in get_RoomAdmins ', room, room.owner);
        return room.banList;
    }
    async banUser(body) {
        let roomId = body.roomId;
        let user = await this.userId_fromLogin(body.userIdToMute);
        let userIdToBan = user['id'];
        let userId = body.userId;
        if (await this.userIsAdmin(roomId, userId) == false || await this.userIsAdmin(roomId, userIdToBan) == true)
            throw 'no right to ban';
        await this.participantService.leaveRoom({ 'userId': userIdToBan, 'roomId': roomId });
        let banList = await this.get_Room_banList(roomId);
        banList.push(userIdToBan);
    }
};
__decorate([
    (0, common_1.Inject)(user_service_1.UserService),
    __metadata("design:type", user_service_1.UserService)
], RoomService.prototype, "userService", void 0);
__decorate([
    (0, common_1.Inject)(message_service_1.MessageService),
    __metadata("design:type", message_service_1.MessageService)
], RoomService.prototype, "messageService", void 0);
__decorate([
    (0, common_1.Inject)(participant_service_1.ParticipantService),
    __metadata("design:type", participant_service_1.ParticipantService)
], RoomService.prototype, "participantService", void 0);
RoomService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(room_entity_1.Room)),
    __param(1, (0, typeorm_1.InjectRepository)(participant_entity_1.Participant)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], RoomService);
exports.RoomService = RoomService;
//# sourceMappingURL=room.service.js.map