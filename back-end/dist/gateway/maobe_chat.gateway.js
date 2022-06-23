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
exports.MaobeChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const socket_io_1 = require("socket.io");
const maobe_room_service_1 = require("../services/maobe_room.service");
const maobe_participant_service_1 = require("../services/maobe_participant.service");
const maobe_room_dto_1 = require("../dtos/in/maobe_room.dto");
const participant_dto_1 = require("../dtos/in/participant.dto");
const maobe_JoinRoom_dto_1 = require("../dtos/in/maobe_JoinRoom.dto");
const maobe_message_service_1 = require("../services/maobe_message.service");
const user_service_1 = require("../services/user.service");
const maobe_admin_dto_1 = require("../dtos/in/maobe_admin.dto");
let MaobeChatGateway = class MaobeChatGateway {
    constructor(participantService, roomService, messageService, userService) {
        this.participantService = participantService;
        this.roomService = roomService;
        this.messageService = messageService;
        this.userService = userService;
    }
    async handleMessage(client, payload) {
        let userId = Number(client.handshake.headers.userid);
        try {
            const rooms = await this.roomService.maobe_getJoinRooms(userId);
            client.emit('B_getRooms', rooms);
        }
        catch (e) {
            return false;
        }
        return true;
    }
    async createRoom(client, body) {
        let userId = Number(client.handshake.headers.userid);
        try {
            const new_room = await this.roomService.maobe_createRoom(userId, body);
            client.emit('B_createRoom', new_room);
        }
        catch (e) {
            return false;
        }
        return true;
    }
    deleteRoom(socket, roomId) {
        return (true);
    }
    async banUser(socket, infos) {
        try {
            await this.roomService.banUser(infos);
        }
        catch (e) {
            return false;
        }
        return true;
    }
    async getUsers(socket) {
        let userId = Number(socket.handshake.headers.userid);
        try {
            const users = await this.roomService.get_AvailableUsers(userId);
            socket.emit('B_getAvailableUsers', users);
        }
        catch (e) {
            return false;
        }
        return true;
    }
    async getRoomUsers(socket, roomId) {
        const userId = Number(socket.handshake.headers.userid);
        try {
            const users = await this.roomService.getRoom_AvailableUsers(userId, roomId);
            this.server.emit('B_getRoomAvailableUsers', users);
        }
        catch (e) {
            return false;
        }
        return true;
    }
    async getDispoRooms(socket) {
        const userId = Number(socket.handshake.headers.userid);
        try {
            const rooms = await this.roomService.getDispoRooms(userId);
            socket.emit('B_getDispoRooms', rooms);
        }
        catch (e) {
            return false;
        }
        return true;
    }
    async createParticipant(socket, dto) {
        const userId = Number(socket.handshake.headers.userid);
        try {
            await this.roomService.joinRoom(dto);
            const info = await this.roomService.createParticipant({ 'userId': userId,
                'roomId': dto.roomId });
            socket.emit('B_joinRoom', info);
        }
        catch (e) {
            return false;
        }
        return true;
    }
    async blockUser(socket, b_userId) {
        const userId = Number(socket.handshake.headers.userid);
        try {
            await this.roomService.blockUser(userId, b_userId);
        }
        catch (e) {
            return false;
        }
        return (true);
    }
    directMessage(socket, infos) {
        console.log(`directMessage ${infos}`);
        console.log('i am here!!!!!');
        return (true);
    }
    async createMessage(socket, message) {
        const userId = Number(socket.handshake.headers.userid);
        message.userId = userId;
        try {
            var res = await this.messageService.createMessage(message);
            this.server.to(message.roomId.toString()).emit('B_createMessage', res);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    async updateRoom(socket, roomInfos) {
        try {
            const update_room = await this.roomService.maobe_updateRoom(roomInfos);
            socket.emit('B_updateRoom', update_room);
        }
        catch (e) {
            return false;
        }
        return true;
    }
    async getMessage(socket, roomId) {
        socket.join(roomId.toString());
        const allMessages = await this.roomService.maobe_getMessages(roomId);
        this.server.emit('B_getMessages', { 'roomId': roomId,
            'messages': allMessages
        });
        return (true);
    }
    async leaveRoom(socket, roomId) {
        const userId = Number(socket.handshake.headers.userid);
        const body = { 'userId': userId, 'roomId': roomId };
        try {
            await this.roomService.AdminleaveRoom(body);
            await this.participantService.leaveRoom(body);
            socket.emit('B_leaveRoom', body);
        }
        catch (e) {
            return false;
        }
        return true;
    }
    async setAsAdmin(socket, dto) {
        try {
            await this.roomService.setAsAdmin(dto);
            socket.emit('B_setAsAdmin', dto.userId, dto.roomId);
        }
        catch (e) {
            return false;
        }
        return true;
    }
    async kickUser(participantDto) {
        try {
            await this.participantService.leaveRoom(participantDto);
            await this.roomService.AdminleaveRoom(participantDto);
        }
        catch (e) {
            return false;
        }
        return true;
    }
    async muteUser(participantDto) {
        try {
            await this.participantService.muteUser(participantDto);
        }
        catch (e) {
            return false;
        }
        return true;
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], MaobeChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('F_getRooms'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", Promise)
], MaobeChatGateway.prototype, "handleMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('F_createRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, maobe_room_dto_1.RoomDto]),
    __metadata("design:returntype", Promise)
], MaobeChatGateway.prototype, "createRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('F_deleteMessage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Number]),
    __metadata("design:returntype", Boolean)
], MaobeChatGateway.prototype, "deleteRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('F_banUser'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, participant_dto_1.ParticipantDto]),
    __metadata("design:returntype", Promise)
], MaobeChatGateway.prototype, "banUser", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('F_getAvailableUsers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], MaobeChatGateway.prototype, "getUsers", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('F_getRoomAvailableUsers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Number]),
    __metadata("design:returntype", Promise)
], MaobeChatGateway.prototype, "getRoomUsers", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('F_getDispoRooms'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], MaobeChatGateway.prototype, "getDispoRooms", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('F_joinRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, maobe_JoinRoom_dto_1.JoinRoomDto]),
    __metadata("design:returntype", Promise)
], MaobeChatGateway.prototype, "createParticipant", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('F_blockUser'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Number]),
    __metadata("design:returntype", Promise)
], MaobeChatGateway.prototype, "blockUser", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('F_directMessage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Boolean)
], MaobeChatGateway.prototype, "directMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('F_createMessage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], MaobeChatGateway.prototype, "createMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('F_updateRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], MaobeChatGateway.prototype, "updateRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('F_getMessages'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Number]),
    __metadata("design:returntype", Promise)
], MaobeChatGateway.prototype, "getMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('F_leaveRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Number]),
    __metadata("design:returntype", Promise)
], MaobeChatGateway.prototype, "leaveRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('F_setAsAdmin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, maobe_admin_dto_1.AdminDto]),
    __metadata("design:returntype", Promise)
], MaobeChatGateway.prototype, "setAsAdmin", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('F_kickUser'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [participant_dto_1.ParticipantDto]),
    __metadata("design:returntype", Promise)
], MaobeChatGateway.prototype, "kickUser", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('F_muteUser'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [participant_dto_1.ParticipantDto]),
    __metadata("design:returntype", Promise)
], MaobeChatGateway.prototype, "muteUser", null);
MaobeChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    __metadata("design:paramtypes", [maobe_participant_service_1.MaobeParticipantService,
        maobe_room_service_1.MaobeRoomService,
        maobe_message_service_1.MaobeMessageService,
        user_service_1.UserService])
], MaobeChatGateway);
exports.MaobeChatGateway = MaobeChatGateway;
//# sourceMappingURL=maobe_chat.gateway.js.map