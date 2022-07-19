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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PongGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const pong_service_1 = require("../services/pong.service");
const lookingForAGame_dto_1 = require("../dtos/in/lookingForAGame.dto");
const joinPongRoom_dto_1 = require("../dtos/in/joinPongRoom.dto");
const user_service_1 = require("../services/user.service");
let PongGateway = class PongGateway {
    constructor(pongService, userService) {
        this.pongService = pongService;
        this.userService = userService;
    }
    afterInit(server) {
        console.log('Pong socket server Initialized:');
    }
    handleConnection(client) {
        console.log(`client with id: ${client.id} connected !`);
    }
    handleDisconnect(client) {
        console.log(`Client with id: ${client.id} disconnected!`);
        this.pongService.handleDisconnect(client);
    }
    async setSocketId(socket, username) {
        console.log(`in set socket id, username is ${username}`);
        return await this.pongService.setSocketId(socket, username);
    }
    async lookingForplay(socket, data) {
        console.log('lookingForAGame Gateway');
        console.log(`uerId is ${data.userId}, difficulty is ${data.difficulty} and maxScore is ${data.maxScore}`);
        console.log(data);
        let value = await this.pongService.managePlayer(socket, this.server, data.userId, data.difficulty, data.maxScore);
    }
    iDontWannaPlayAnymore(socket, userId) {
        this.pongService.iDontWannaPlayAnymore(socket, userId);
    }
    async join(socket, data) {
        console.log('joinPongRoom Gateway');
        console.log('in joinPongRoom Gateway');
        console.log('data is');
        console.log(data);
        this.pongService.joinPongRoom(socket, this.server, data.userId, data.roomId);
    }
    async moveAction(socket, move) {
        await this.pongService.registerMove(move);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], PongGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('setSocketId'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", Promise)
], PongGateway.prototype, "setSocketId", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('lookingForAGame'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, lookingForAGame_dto_1.lookingForAGameDto]),
    __metadata("design:returntype", Promise)
], PongGateway.prototype, "lookingForplay", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('iDontWannaPlayAnymore'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Number]),
    __metadata("design:returntype", void 0)
], PongGateway.prototype, "iDontWannaPlayAnymore", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinPongRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, joinPongRoom_dto_1.joinPongRoomDto]),
    __metadata("design:returntype", Promise)
], PongGateway.prototype, "join", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('move'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], PongGateway.prototype, "moveAction", null);
PongGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ path: '/pongSocketServer', cors: { origin: '*' } }),
    __metadata("design:paramtypes", [pong_service_1.PongService, user_service_1.UserService])
], PongGateway);
exports.PongGateway = PongGateway;
//# sourceMappingURL=pong.gateway.js.map