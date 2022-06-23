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
exports.RoomGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const room_service_1 = require("../services/room.service");
const common_1 = require("@nestjs/common");
const socket_io_1 = require("socket.io");
const room_dto_1 = require("../dtos/in/room.dto");
const JoinRoom_dto_1 = require("../dtos/in/JoinRoom.dto");
const room_password_dto_1 = require("../dtos/in/room_password.dto");
const update_admin_dto_1 = require("../dtos/in/update_admin.dto");
const participant_dto_1 = require("../dtos/in/participant.dto");
const blockUser_dto_1 = require("../dtos/in/blockUser.dto");
const banUser_dto_1 = require("../dtos/in/banUser.dto");
const user_service_1 = require("../services/user.service");
const message_service_1 = require("../services/message.service");
const participant_service_1 = require("../services/participant.service");
let RoomGateway = class RoomGateway {
    constructor(roomService, userService, messageService, participantService) {
        this.roomService = roomService;
        this.userService = userService;
        this.messageService = messageService;
        this.participantService = participantService;
    }
    async createRoom(socket, body) {
        console.log('in the gateway of event createRoom');
        const name_exist = await this.roomService.IsRoomName_Unique(body.name);
        if (name_exist == false) {
            socket.emit('exception', {
                status: 'error',
                message: 'name is already exist'
            });
            return;
        }
        const value = await this.roomService.createRoom(body);
        console.log('return value of roomId is ', value);
        socket.emit('idRoom', value);
    }
    async JoinRoom(socket, body) {
        console.log('in gateway of JoinRoom', body);
        const have_access = await this.roomService.joinRoom(body);
        socket.emit('hasJoined', have_access);
    }
    async getRoom(socket, room_id) {
        socket.join(room_id.toString());
    }
    async deleteRoom(id) {
        await this.roomService.deleteRoom(id);
    }
    async updateRoomPw(socket, body) {
        console.log('in updateRoomPw ', body);
        let res = await this.roomService.updateRoomPw(body);
        console.log(res);
        socket.emit('UpdatePwRes', res);
    }
    async deleteRoomPw(socket, body) {
        console.log('deleteRoomPw', body);
        let res = await this.roomService.deleteRoomPw(body);
        socket.emit('deletePWRes', res);
    }
    async manageAdmin(body) {
        console.log("in gw ManageAdmin ", body);
        await this.roomService.manageAdmin(body);
    }
    async getMessage(socket, body) {
        console.log('in gw getMessage ', body);
        const info = await this.messageService.getRoomMessage(body);
        console.log('in gate way, info is', info);
        socket.emit('msgToClient', info);
        socket.join(body.roomId.toString());
    }
    async blockUser(body) {
        await this.userService.blockUser(body);
    }
    async leaveRoom(body) {
        console.log('leaveRoom in room gw ', body);
        await this.roomService.AdminleaveRoom(body);
        await this.participantService.leaveRoom(body);
    }
    async allRoomInfos(socket) {
        let rooms = await this.roomService.allRoomInfos();
        socket.emit('allRoomInfosRes', rooms);
    }
    async banUser(socket, body) {
        console.log('-----------', body, '-----------');
        try {
            await this.roomService.banUser(body);
        }
        catch (e) {
            console.log('------------&&&&&----------', e);
            return { status: 'KO', msg: 'Something went wrong' };
        }
        return { status: 'OK',
            msg: 'Successfully baned the user'
        };
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], RoomGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('createRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, room_dto_1.RoomDto]),
    __metadata("design:returntype", Promise)
], RoomGateway.prototype, "createRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('JoinRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, JoinRoom_dto_1.JoinRoomDto]),
    __metadata("design:returntype", Promise)
], RoomGateway.prototype, "JoinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('getRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Number]),
    __metadata("design:returntype", Promise)
], RoomGateway.prototype, "getRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('deleteRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RoomGateway.prototype, "deleteRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('updateRoomPw'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, room_password_dto_1.RoomPwDto]),
    __metadata("design:returntype", Promise)
], RoomGateway.prototype, "updateRoomPw", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('deleteRoomPw'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, room_password_dto_1.RoomPwDto]),
    __metadata("design:returntype", Promise)
], RoomGateway.prototype, "deleteRoomPw", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('manageAdmin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_admin_dto_1.UpdateAdminDto]),
    __metadata("design:returntype", Promise)
], RoomGateway.prototype, "manageAdmin", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('getMessage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, participant_dto_1.ParticipantDto]),
    __metadata("design:returntype", Promise)
], RoomGateway.prototype, "getMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('blockUser'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [blockUser_dto_1.BlockUserDto]),
    __metadata("design:returntype", Promise)
], RoomGateway.prototype, "blockUser", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leaveRoom'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [participant_dto_1.ParticipantDto]),
    __metadata("design:returntype", Promise)
], RoomGateway.prototype, "leaveRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('allRoomInfos'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], RoomGateway.prototype, "allRoomInfos", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('banUser'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, banUser_dto_1.BanUserDto]),
    __metadata("design:returntype", Promise)
], RoomGateway.prototype, "banUser", null);
RoomGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    __metadata("design:paramtypes", [room_service_1.RoomService,
        user_service_1.UserService,
        message_service_1.MessageService,
        participant_service_1.ParticipantService])
], RoomGateway);
exports.RoomGateway = RoomGateway;
//# sourceMappingURL=room.gateway.js.map