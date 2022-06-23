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
exports.MaobeRoomService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../models/user.entity");
const maobe_room_entity_1 = require("../models/maobe_room.entity");
const maobe_participant_entity_1 = require("../models/maobe_participant.entity");
const maobe_message_entity_1 = require("../models/maobe_message.entity");
const bcrypt = require("bcrypt");
const user_service_1 = require("./user.service");
const maobe_message_service_1 = require("./maobe_message.service");
const maobe_participant_service_1 = require("./maobe_participant.service");
let MaobeRoomService = class MaobeRoomService {
    constructor(roomRepository, participantRepository, userRepository, messagesRepository) {
        this.roomRepository = roomRepository;
        this.participantRepository = participantRepository;
        this.userRepository = userRepository;
        this.messagesRepository = messagesRepository;
    }
    async maobe_getMessages(roomId) {
        let messages = await this.messagesRepository.createQueryBuilder("maobe_messages")
            .where("maobe_messages.roomId = :room_Id", { room_Id: roomId })
            .getMany();
        return messages;
    }
    async maobe_getJoinRooms(userId) {
        let blockList = await this.Mutual_blocklist(userId);
        const roomIds_obj = await this.roomRepository.createQueryBuilder()
            .select(["MaobeRoom.id"])
            .innerJoin(maobe_participant_entity_1.MaobeParticipant, "participant", `participant.roomId = MaobeRoom.id`)
            .where("participant.userId = :id", { id: userId })
            .andWhere("MaobeRoom.owner NOT IN (:...ids)", { ids: blockList })
            .getMany();
        const roomIds = [];
        roomIds_obj.forEach((obj) => {
            roomIds.push(obj.id);
        });
        if (roomIds.length === 0)
            return [];
        let rooms = await this.roomRepository.createQueryBuilder("MaobeRoom")
            .select(["MaobeRoom", "p.mute_until", "u"])
            .leftJoin(maobe_participant_entity_1.MaobeParticipant, "p", `p.roomId = MaobeRoom.id`)
            .leftJoin(user_entity_1.User, "u", `p.userId = u.id`)
            .where("MaobeRoom.id IN (:...ids)", { ids: roomIds })
            .getRawMany();
        let managedIndex = [];
        let ret = [];
        rooms.forEach((obj) => {
            if (managedIndex.indexOf(obj.MaobeRoom_id) === -1) {
                managedIndex.push(obj.MaobeRoom_id);
                const users = rooms.filter((obj2) => obj2.MaobeRoom_id === obj.MaobeRoom_id);
                const tmp_participants = [];
                const now_date = new Date();
                users.forEach((obj2) => {
                    const mute_date = new Date(obj2.p_mute_until);
                    if (blockList.indexOf(obj2.u_id) === -1) {
                        tmp_participants.push({
                            'userId': obj2.u_id,
                            'username': obj2.u_username,
                            'avatar': obj2.u_avatar,
                            'isMute': mute_date > now_date,
                        });
                    }
                });
                ret.push({
                    'id': obj.MaobeRoom_id,
                    'name': obj.MaobeRoom_name,
                    'typeRoom': obj.MaobeRoom_typeRoom,
                    'image': obj.MaobeRoom_image,
                    'owner': obj.MaobeRoom_owner,
                    'admin': obj.MaobeRoom_admin,
                    'participants': tmp_participants
                });
            }
        });
        return ret;
    }
    async joinRoom(dto) {
        if (dto.isProtected === true) {
            const room_info = await this.roomRepository.createQueryBuilder("room")
                .select(["room.password"])
                .where("room.id = :room_Id", { room_Id: dto.roomId })
                .getOne();
            const res = await bcrypt.compare(dto.password, room_info['password']);
            if (res === false) {
                throw 'password is wrong';
            }
        }
    }
    async createParticipant(participantDto) {
        await this.participantService.createParticipant(participantDto);
        const roomIds = participantDto.roomId;
        let rooms = await this.roomRepository.createQueryBuilder("MaobeRoom")
            .select(["MaobeRoom", "u"])
            .leftJoin(maobe_participant_entity_1.MaobeParticipant, "p", `p.roomId = MaobeRoom.id`)
            .leftJoin(user_entity_1.User, "u", `p.userId = u.id`)
            .where("MaobeRoom.id = :ids", { ids: roomIds })
            .getRawMany();
        let managedIndex = [];
        let ret = [];
        rooms.forEach((obj) => {
            if (managedIndex.indexOf(obj.MaobeRoom_id) === -1) {
                managedIndex.push(obj.MaobeRoom_id);
                const users = rooms.filter((obj2) => obj2.MaobeRoom_id === obj.MaobeRoom_id);
                const tmp_participants = [];
                const now_date = new Date();
                users.forEach((obj2) => {
                    const mute_date = new Date(obj2.p_mute_until);
                    tmp_participants.push({
                        'userId': obj2.u_id,
                        'username': obj2.u_username,
                        'avatar': obj2.u_avatar,
                        'isMute': mute_date > now_date,
                    });
                });
                ret.push({
                    'id': obj.MaobeRoom_id,
                    'name': obj.MaobeRoom_name,
                    'typeRoom': obj.MaobeRoom_typeRoom,
                    'image': obj.MaobeRoom_image,
                    'owner': obj.MaobeRoom_owner,
                    'admin': obj.MaobeRoom_admin,
                    'participants': tmp_participants
                });
            }
        });
        return ret[0];
    }
    async maobe_createRoom(userId, roomDto) {
        const new_room = new maobe_room_entity_1.MaobeRoom();
        if (roomDto.image === undefined || roomDto.image === null || roomDto.image.length === 0) {
            new_room.image = 'https://stickershop.line-scdn.net/stickershop/v1/product/7594755/LINEStorePC/main.png;compress=true';
        }
        else {
            new_room.image = roomDto.image;
        }
        new_room.name = roomDto.name;
        new_room.typeRoom = roomDto.typeRoom;
        if (roomDto.password.length > 0) {
            new_room.is_protected = true;
            const password = roomDto.password;
            const saltOrRounds = 10;
            const hash = await bcrypt.hash(password, saltOrRounds);
            new_room.password = hash;
        }
        else
            new_room.password = null;
        new_room.owner = userId;
        if (new_room.admin == null)
            new_room.admin = [];
        new_room.admin.push(userId);
        await this.roomRepository.save(new_room);
        await this.participantService.createParticipant({ 'userId': userId, 'roomId': new_room.id });
        let users = roomDto.users;
        const user = await this.userRepository.findOne(userId);
        if (users.length > 0) {
            users.forEach(async (element) => await this.participantService.createParticipant({ 'userId': element['id'], 'roomId': new_room.id }));
        }
        users.push(user);
        return {
            'id': new_room.id,
            'name': new_room.name,
            'typeRoom': new_room.typeRoom,
            'image': new_room.image,
            'owner': new_room.owner,
            'admin': new_room.admin,
            'participants': users,
            'is_protected': new_room.is_protected
        };
    }
    async get_AvailableUsers(userId) {
        let blockList = await this.Mutual_blocklist(userId);
        blockList.push(userId);
        let dispo_users = await this.userRepository.createQueryBuilder("user")
            .where("user.id NOT IN (:...list) ", { list: blockList })
            .getMany();
        return dispo_users;
    }
    async getRoom_AvailableUsers(userId, roomId) {
        let blockList = await this.Mutual_blocklist(userId);
        let deja_member = await this.participantRepository.createQueryBuilder("participant")
            .select(["participant.userId"])
            .where("participant.roomId = :room_Id", { room_Id: roomId })
            .getMany();
        deja_member.forEach(element => blockList.push(element.userId));
        let banList = await this.get_Room_banList(roomId);
        if (banList.length > 0)
            banList.forEach(element => blockList.push(element));
        let users = await this.userRepository.createQueryBuilder("user")
            .where("user.id NOT IN (:...list) ", { list: blockList })
            .getMany();
        return users;
    }
    async maobe_updateRoom(roomInfos) {
        let room = await this.roomRepository.createQueryBuilder("room")
            .where("room.id = :room_Id", { room_Id: roomInfos.roomId })
            .getOne();
        if (room === undefined) {
            throw 'cannot find this room';
            return;
        }
        var is_protected = false;
        var password = null;
        if (roomInfos['password'].length !== 0) {
            is_protected = true;
            password = await bcrypt.hash(roomInfos.password, 10);
        }
        await this.roomRepository
            .createQueryBuilder()
            .update(maobe_room_entity_1.MaobeRoom)
            .set({ name: roomInfos.name, typeRoom: roomInfos.roomType,
            is_protected: is_protected,
            password: password })
            .where("id = :id", { id: roomInfos.roomId })
            .execute();
        const new_participants = roomInfos.newParticipants.forEach(async (element) => {
            await this.participantService.createParticipant({ 'userId': element['id'], 'roomId': roomInfos.roomId });
        });
        const update_room = await this.roomRepository.findOne(roomInfos.roomId);
        return {
            'id': update_room['id'],
            'name': update_room['name'],
            'typeRoom': update_room['typeRoom'],
            'is_protected': update_room['is_protected'],
            'image': update_room['image'],
            'owner': update_room['owner'],
            'admin': update_room['admin'],
            'participants': roomInfos.newParticipants,
        };
    }
    async getRoom(room_Id) {
        const room = await this.roomRepository.findOne(room_Id);
        const p = await this.roomRepository.createQueryBuilder("room")
            .select(["room.id", "room.name"])
            .leftJoinAndSelect("room.participants", "participant")
            .leftJoinAndSelect("participant.user", "user")
            .where("room.id = :room_Id", { room_Id: room_Id })
            .getOne();
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
    async userIsAdmin(roomId, userId) {
        let admins = await this.get_RoomAdmins(roomId);
        return await admins.indexOf(userId) != -1;
    }
    async setAsAdmin(dto) {
        if (dto.userId === undefined)
            throw ('sth went wrong');
        let admins = await this.get_RoomAdmins(dto.roomId);
        if (dto.toAdd === true)
            admins.push(dto.userId);
        else {
            let index = admins.indexOf(dto.userId);
            if (index !== -1)
                admins.splice(index, 1);
            else
                return;
        }
        await this.roomRepository
            .createQueryBuilder()
            .update(maobe_room_entity_1.MaobeRoom)
            .set({ admin: admins })
            .where("id = :id", { id: dto.roomId })
            .execute();
    }
    async get_Room_banList(roomId) {
        let room = await this.roomRepository.createQueryBuilder("room")
            .select(["room.banList"])
            .where("room.id = :room_Id", { room_Id: roomId })
            .getOne();
        return room.banList;
    }
    async blockUser(userId, b_userId) {
        let block_list = await this.userService.getBlockList(userId);
        if (block_list.indexOf(b_userId) !== -1)
            return;
        block_list.push(b_userId);
        await this.userRepository
            .createQueryBuilder()
            .update(user_entity_1.User)
            .set({ blockList: block_list })
            .where("id = :id", { id: userId })
            .execute();
    }
    async Blocklist_to_user(userId) {
        let block_list = [];
        let users = await this.userRepository.createQueryBuilder("user")
            .select(["user.id"])
            .getMany();
        for (var i = 0; i < users.length; i++) {
            let user_block_list = await this.userService.getBlockList(users[i].id);
            if (user_block_list.includes(userId))
                block_list.push(users[i].id);
        }
        return block_list;
    }
    async Mutual_blocklist(userId) {
        let block_list_to_user = await this.Blocklist_to_user(userId);
        let user_block_list_to_other = await this.userService.getBlockList(userId);
        let list_block = [...block_list_to_user, ...user_block_list_to_other];
        let unique_block_list = [...new Set(list_block)];
        if (unique_block_list.length == 0) {
            unique_block_list.push(-1);
        }
        return unique_block_list;
    }
    async getDispoRooms(userId) {
        let blockList = await this.Mutual_blocklist(userId);
        let joined_rooms = await this.participantRepository.createQueryBuilder("participant")
            .select("participant.roomId")
            .where("participant.userId = :id", { id: userId })
            .getMany();
        let joined_roomsIds = [];
        joined_rooms.forEach((obj) => {
            joined_roomsIds.push(obj.roomId);
        });
        if (joined_roomsIds.length === 0)
            joined_roomsIds.push(-1);
        var rooms = await this.roomRepository.createQueryBuilder("room")
            .leftJoin("room.participants", "participant")
            .where("room.typeRoom = :typeRoom", { typeRoom: 'public' })
            .andWhere("room.owner NOT IN (:...names) ", { names: blockList })
            .andWhere("room.id NOT IN (:...rid)", { rid: joined_roomsIds })
            .getMany();
        for (var i = 0; i < rooms.length; i++) {
            if (rooms[i].banList.length !== 0) {
                let banList = await this.get_Room_banList(rooms[i].id);
                if (banList.includes(userId)) {
                    rooms.splice(i, 1);
                }
            }
        }
        return rooms;
    }
    async banUser(body) {
        let roomId = body.roomId;
        let userIdToBan = body.userId;
        await this.participantService.leaveRoom({ 'userId': userIdToBan, 'roomId': roomId });
        let banList = await this.get_Room_banList(roomId);
        if ((await this.userIsAdmin(roomId, userIdToBan)) === true) {
            var admins = await this.get_RoomAdmins(roomId);
            var index = admins.indexOf(userIdToBan);
            admins.splice(index, 1);
            this.roomRepository.update({ id: roomId }, {
                admin: admins
            });
        }
        if (banList.indexOf(userIdToBan) === -1 && userIdToBan !== null)
            banList.push(userIdToBan);
        await this.roomRepository
            .createQueryBuilder()
            .update(maobe_room_entity_1.MaobeRoom)
            .set({ banList: banList })
            .where("id = :id", { id: roomId })
            .execute();
    }
    async findOne(id) {
        return this.roomRepository.findOne(id);
    }
    async get_Room_Owner(roomId) {
        let room = await this.roomRepository.createQueryBuilder("room")
            .select(["room.owner"])
            .where("room.id = :room_Id", { room_Id: roomId })
            .getOne();
        console.log('in get_RoomOwner ', room, room.owner);
        return room.owner;
    }
    async get_RoomAdmins(roomId) {
        let room = await this.roomRepository.createQueryBuilder("room")
            .select(["room.admin"])
            .where("room.id = :room_Id", { room_Id: roomId })
            .getOne();
        return room.admin;
    }
    async AdminleaveRoom(body) {
        let is_already_admin = await this.userIsAdmin(body.roomId, body.userId);
        if (is_already_admin == true) {
            let admins = await this.get_RoomAdmins(body.roomId);
            var index = admins.indexOf(body.userId);
            admins.splice(index, 1);
            await this.roomRepository
                .createQueryBuilder()
                .update(maobe_room_entity_1.MaobeRoom)
                .set({ admin: admins })
                .where("id = :id", { id: body.roomId })
                .execute();
        }
    }
};
__decorate([
    (0, common_1.Inject)(user_service_1.UserService),
    __metadata("design:type", user_service_1.UserService)
], MaobeRoomService.prototype, "userService", void 0);
__decorate([
    (0, common_1.Inject)(maobe_message_service_1.MaobeMessageService),
    __metadata("design:type", maobe_message_service_1.MaobeMessageService)
], MaobeRoomService.prototype, "messageService", void 0);
__decorate([
    (0, common_1.Inject)(maobe_participant_service_1.MaobeParticipantService),
    __metadata("design:type", maobe_participant_service_1.MaobeParticipantService)
], MaobeRoomService.prototype, "participantService", void 0);
MaobeRoomService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(maobe_room_entity_1.MaobeRoom)),
    __param(1, (0, typeorm_1.InjectRepository)(maobe_participant_entity_1.MaobeParticipant)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(3, (0, typeorm_1.InjectRepository)(maobe_message_entity_1.MaobeMessage)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], MaobeRoomService);
exports.MaobeRoomService = MaobeRoomService;
//# sourceMappingURL=maobe_room.service.js.map